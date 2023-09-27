import {Profile} from "@/types/supabase";
import CompactUser from "@/components/CompactUser";


export default function CompactUserList(props: { users: Profile[], max?: number }) {
    const {users, max = 4} = props;
    return (
        <div className={'inline-flex h-max w-full justify-center'}>
            {users.slice(0,max-1).map((user, id) => {
                return (
                    <div key={user.id} className={`mx-[-15px] z-[${id + 1}] h-[40px]`}>
                        <CompactUser {...{user}} />
                    </div>
                )
            })}
            {users.length > max && (
                <div className={'relative z-[0] bg-white w-[40px] h-[40px] text-center rounded-full border border-accent-foreground'}>
                    <p className={'absolute top-0 bottom-0 left-2 right-0 h-max my-auto'}>
                        +{users.length - max}
                    </p>
                </div>
            )}
        </div>
    )
}
