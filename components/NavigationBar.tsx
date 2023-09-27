import {Separator} from "@/components/ui/separator";
import React from "react";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

export default async function NavigationBar() {
    const supabase = createServerComponentClient({cookies});
    const loggedIn = !!(await supabase.auth.getUser());


    type Link = { title: string, href: string, loggedIn: boolean, loggedOut: boolean };
    const links: Link[] = [
        {
            title: 'Home',
            href: '/',
            loggedIn: true,
            loggedOut: true,
        },
        {
            title: 'Login',
            href: '/login',
            loggedIn: false,
            loggedOut: true
        },
        {
            title: 'Dashboard',
            href: '/dashboard',
            loggedIn: true,
            loggedOut: false,
        }
    ];

    return (
        <React.Fragment>
            <div className={'inline-flex justify-between flex-grow w-full'}>
                <div className={'inline-flex gap-2 p-4 items-center'}>
                    <h1>
                        Auth Rooms
                    </h1>
                </div>
                <div className={'inline-flex gap-2 p-4 items-center'}>
                    {links.map(link => {
                        if (loggedIn && link.loggedIn || !loggedIn && link.loggedOut) {
                            return <Link className={buttonVariants({variant: "outline"})}
                                         href={link.href}>{link.title}</Link>
                        }
                    })
                    }
                </div>
            </div>
            <Separator/>
        </React.Fragment>
    )
}