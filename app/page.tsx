import {createServerComponentClient, User} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {createRoom, deleteRoom, joinRoom} from "@/actions/rooms";
import ProfileDisplay from "@/components/ProfileDisplay";
import {Database} from "@/types/supabase";
import RoomDisplay from "@/components/RoomDisplay";
import {redirect} from "next/navigation";

export const dynamic = 'force-dynamic'

export default async function Index() {
    const supabase = createServerComponentClient<Database>({cookies})

    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('http://localhost:3000/login');
    }

    const verifiedUser = user as User;

    const {data: allRooms} = await supabase.from('rooms').select('*');


    return (
        <div className="w-full flex flex-col items-center max-w-xl">

            {user && <div className={'inline-flex flex-col gap-2'}>
                <ProfileDisplay client={supabase} passedUser={verifiedUser} />
                <form className={'inline-flex flex-col gap-2'}>
                    <Label htmlFor={'create_room_name'}>Name</Label>
                    <Input name={'create_room_name'} type={'text'}/>
                    <Button formAction={createRoom}>Create room</Button>
                </form>
                <form className={'inline-flex flex-col gap-2'}>
                    <Label htmlFor={'join_room_id'}>ID</Label>
                    <Input name={'join_room_id'} type={'text'}/>
                </form>
                <form className={'inline-flex flex-col gap-2'}>
                    <Label htmlFor={'delete_room_id'}>ID</Label>
                    <Input name={'delete_room_id'} type={'text'}/>
                    <Button formAction={deleteRoom}>Delete room</Button>
                </form>
                <div>
                    <h2>All rooms: </h2>
                    {allRooms && allRooms.map(room => {
                        return <p>"{room.name}" : {room.id}</p>
                    })}
                </div>
                <RoomDisplay />
            </div>}
        </div>
    )
}
