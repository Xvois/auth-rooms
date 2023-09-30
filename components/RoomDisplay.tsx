import {SupabaseClient} from "@supabase/supabase-js";
import {createServerComponentClient, User} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {resolveUser} from "@/lib/users";
import {Database, Profile} from "@/types/supabase";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import CompactUser from "@/components/CompactUser";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import CompactUserList from "@/components/CompactUserList";
import {getMembershipMap, getOwner} from "@/lib/rooms";

export default async function RoomDisplay(props: { client?: SupabaseClient<Database>, passedUser?: User }) {
    const {client, passedUser} = props;
    const supabase = client ?? createServerComponentClient<Database>(({cookies}));
    const user = await resolveUser(supabase, passedUser);

    const {data: roomData} = await supabase.from('profiles').select('rooms (*)')
    const rooms = roomData ? roomData.map((row) => row.rooms).flat() : [];

    const membershipsMap = await getMembershipMap(supabase, rooms);

    // Prevents duplicates by using a set.
    const ownerPromisesSet: Set<PromiseLike<Profile>> = new Set();
    rooms.forEach((room) => {
        ownerPromisesSet.add(getOwner(supabase, room));
    });
    const ownerPromises = Array.from(ownerPromisesSet);
    const owners = await Promise.all(ownerPromises);
    const ownersMap = new Map();
    owners.forEach(owner => ownersMap.set(owner.id, owner));

    return (
        <section>
            <div className={'p-2'}>
                <h2 className={'text-xl font-bold'}>Joined rooms</h2>
                <p className={'text-accent-foreground'}>Hover or click to view users, or press view to see more about the room.</p>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className={'text-center'}>Owner</TableHead>
                        <TableHead className={'text-center w-[200px]'}>Members</TableHead>
                        <TableHead/>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rooms.map(room => {
                        return <TableRow key={room.id}>
                            <TableCell>{room.name}</TableCell>
                            <TableCell>
                                <CompactUser user={ownersMap.get(room.owner_id)}/>
                            </TableCell>
                            <TableCell>
                                <CompactUserList max={4} users={membershipsMap.get(room.id)} />
                            </TableCell>
                            <TableCell>
                                <Link className={buttonVariants({variant: "outline"})}
                                      href={`/room/${room.id}`}>View</Link>
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </section>
    )
}