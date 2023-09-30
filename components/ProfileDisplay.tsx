import {createServerComponentClient, User} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {SupabaseClient} from "@supabase/supabase-js";
import {resolveUser} from "@/lib/users";
import {Database} from "@/types/supabase";
import Image from "next/image";


export default async function ProfileDisplay(props: { client?: SupabaseClient<Database>, passedUser?: User, editable: boolean }) {
    const {client, passedUser, editable} = props;
    const supabase = client ?? createServerComponentClient<Database>({cookies});
    const user = await resolveUser(supabase, passedUser);

    const {data: profile} = await supabase.from('profiles').select('*').eq('id', user?.id);

    return profile && (
        <section>
            <h2>{profile[0].display_name}</h2>
        </section>
    )
}
