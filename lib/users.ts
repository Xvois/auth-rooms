import {SupabaseClient} from "@supabase/supabase-js";
import {User} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/types/supabase";

/**
 * A helper function that resolves a user from a possible user
 * and a client. Will throw an error if it fails. It prefers a possible
 * user, so this can be used to override a logged-in user.
 * @param client
 * @param possibleUser
 */
export async function resolveUser(client: SupabaseClient<Database>, possibleUser: User | undefined | null): Promise<User> {
    if (possibleUser) {
        return possibleUser;
    } else {
        const { data, error } = await client.auth.getUser();
        if (error) {
            throw new Error(`Failed to fetch user: ${error.message}`);
        }
        return data?.user as User;
    }
}
