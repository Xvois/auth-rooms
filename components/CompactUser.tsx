import {Profile} from "@/types/supabase";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {getInitials} from "@/lib/utils";


export default function CompactUser(props: { user: Profile }) {
    const {user} = props;

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Avatar>
                        <AvatarImage src={user.profile_picture}/>
                        <AvatarFallback>{getInitials(user.display_name)}</AvatarFallback>
                    </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{user.display_name}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}