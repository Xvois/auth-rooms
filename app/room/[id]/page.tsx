import {getMembers, getOwner} from "@/lib/rooms";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Database} from "@/types/supabase";
import DeleteRoomModal from "@/components/DeleteRoomModal";


export default async function PageView({params}: { params: { id: string } }) {

    const supabase = createServerComponentClient<Database>({cookies});
    const {data: {user}} = await supabase.auth.getUser();
    const {data: room} = await supabase.from('rooms').select('*').eq('id', params.id);
    if (room && user) {
        const members = await getMembers(supabase, params.id);
        const owner = await getOwner(supabase, room[0]);
        const isOwnRoom = user.id === owner.id;

        return (
            <div>
                Room id: {params.id}. Owner: {owner.display_name}.
                {isOwnRoom && <DeleteRoomModal room_id={Number(params.id)} />}
            </div>
        )
    } else {
        return (
            <div>
                Room does not exist.
            </div>
        )
    }
}