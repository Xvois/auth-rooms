import {Database, Profile} from "@/types/supabase";
import {SupabaseClient} from "@supabase/supabase-js";

// A helper function to get the owner profile from a room.
export const getOwner = (client: SupabaseClient<Database>, room: { owner_id: string }) => {
    return client
        .from('profiles')
        .select('*')
        .eq('id', room.owner_id)
        .then((result) => {
            if (result.error) {
                throw new Error(`Failed to get owner: ${result.error.message}`);
            }
            // Weird issue; types match but TS throws an error.
            return result.data[0] as Profile;
        });
};

export async function getMembershipMap(client: SupabaseClient<Database>, rooms: { id: number }[]) {
    const membershipPromises = rooms.map(function (r) {
            return client.from('rooms')
                .select('id, profiles (*)').eq('id', r.id);
        }
    );
    // FIXME: not tested on multiple users
    // Use Promise.all to resolve all promises in the array of objects
    const membershipResults = (await Promise.all(membershipPromises)).map(m => m.data).flat();
    const membershipsMap = new Map();
    membershipResults.forEach(function (m) {
        if (m) {
            // Check if it's simply an object (i.e only 1 item)
            if (typeof m.profiles === 'object' && !Array.isArray(m.profiles)) {
                membershipsMap.set(m.id, [m.profiles]);
            } else {
                membershipsMap.set(m.id, m.profiles);
            }
        }
    });

    return membershipsMap;
};

export async function getMembers(client: SupabaseClient<Database>, room_id: string) {
    const {data} = await client.from('rooms').select('id, profiles (*)').eq('id', room_id);
    if(data) {
        console.log(data[0].profiles);
    } else {
        return []
    }
}