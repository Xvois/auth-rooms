'use server'

import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";
import {NextResponse} from "next/server";
import {redirect} from "next/navigation";

// TODO: GET BETTER ERROR HANDLING
// TODO: GET DYNAMIC PATH REVALIDATION

export async function createRoom(formData: FormData) {
    console.info('Create room called.')
    const supabase = createServerComponentClient({cookies});
    const room_name = String(formData.get('create_room_name'));
    const {data: {user}} = await supabase.auth.getUser();
    if (user) {
        const {error: roomError} = await supabase.from('rooms').insert({owner_id: user?.id, name: room_name});
        // This should only return one value. A user should not be able to have multiple rooms with the same names.
        const {data: room} = await supabase.from('rooms').select('id').eq('name', room_name).eq('owner_id', user?.id);
        if (room && !roomError) {
            const {error: membershipError} = await supabase.from('memberships').insert({
                room_id: room[0].id,
                user_id: user.id
            });
            // FIXME: HANDLE ERRORS
            if (!membershipError) {
                return redirect(`/room/${room[0].id}`);
            } else {
                console.error('membershipError');
            }
        } else {
            console.error('roomError');
        }
    }
}

export async function joinRoom(formData: FormData) {
    const supabase = createServerComponentClient({cookies});
    const room_id = String(formData.get('join_room_id'));
    const {data: {user}} = await supabase.auth.getUser();
    if (user) {
        const {data: currentMemberships} = await supabase.from('memberships').select('*').eq('user_id', user.id);
        if (currentMemberships) {
            const isMember = currentMemberships.some(record => record.room_id === room_id);
            if (isMember) {
                console.info('Returning as they are already a member.');
                return;
            }
        }
        await supabase.from('memberships').insert({user_id: user.id, room_id});
    }
    revalidatePath('/');
}

export async function deleteRoom(formData: FormData) {
    const supabase = createServerComponentClient({cookies});
    const room_id = String(formData.get('delete_room_id'));
    if (room_id) {
        console.info('room identified', room_id);
        const response = await supabase.from('rooms').delete().eq('id', room_id);
        console.log(response);
        revalidatePath('/')
    } else {
        console.info('room not identified.')
        return NextResponse.next({status: 200});
    }
}