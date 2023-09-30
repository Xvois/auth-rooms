import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import RoomDisplay from "@/components/RoomDisplay";
import ProfileDisplay from "@/components/ProfileDisplay";
import CreateRoomModal from "@/components/CreateRoomModal";
import {Database} from "@/types/supabase";
import JoinRoomModal from "@/components/JoinRoomModal";

export default async function Dashboard() {
    const supabase = createServerComponentClient<Database>({cookies});
    const {data: {user}} = await supabase.auth.getUser();
    if (user) {
    } else {
        return redirect('/login');
    }

    return (
        <div className={'inline-flex w-full justify-between'}>
            <div className={'float-left'}>
                <ProfileDisplay client={supabase} passedUser={user} editable={true}/>
            </div>
            <div className={'grid'}>
                <div className={'inline-flex flex-col gap-2 p-4'}>
                    <RoomDisplay client={supabase} passedUser={user}/>
                    <JoinRoomModal/>
                    <CreateRoomModal/>
                </div>
            </div>
        </div>
    )
}