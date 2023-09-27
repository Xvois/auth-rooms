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

export default async function RoomDisplay(props: { client?: SupabaseClient<Database>, passedUser?: User }) {
    const {client, passedUser} = props;
    const supabase = client ?? createServerComponentClient<Database>(({cookies}));
    const user = await resolveUser(supabase, passedUser);

    const {data: roomData} = await supabase.from('profiles').select('rooms (*)')
    const rooms = roomData ? roomData.map((row) => row.rooms).flat() : [];

    const membershipPromises = rooms.map(function (r) {
            return supabase.from('rooms')
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

    // A helper function to get the owner profile from a room.
    const getOwner = (room: { owner_id: string }) => {
        return supabase
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

    // Prevents duplicates by using a set.
    const ownerPromisesSet: Set<PromiseLike<Profile>> = new Set();
    rooms.forEach((room) => {
        ownerPromisesSet.add(getOwner(room));
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