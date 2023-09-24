"use client"
import * as z from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import BackButton from '@/components/BackButton';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';

export default function Register() {
    const registerSchema = z.object({
        display_name: z.string().min(1, 'Username must be entered.'),
        email: z.string().email().min(1, 'Email must be entered.'),
        password: z.string().min(1, 'Password must be entered.'),
        confirm_password: z.string().min(1, 'You must confirm your password.')
    }).refine((data) => data.password === data.confirm_password, {
        path: ['confirm_password'],
        message: "Passwords don't match",
    });

    type schemaType = z.infer<typeof registerSchema>;

    const
        form
            = useForm<schemaType>({
            resolver: zodResolver(registerSchema),
            defaultValues: {
                display_name: "",
                email: "",
                password: "",
                confirm_password: "",
            },
            context: "onSubmit"
        });

    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <BackButton target={'/'}/>

            <Form {...form}>
                <form
                      className="inline-flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="display_name"
                        render={({field}) => (
                            <FormItem className={"flex-grow"}>
                                <FormLabel>Display Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="zod25" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Your public display name.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem className={"flex-grow"}>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type={'email'} placeholder="name@example.com" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Your associated email address.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className={'flex flex-row gap-2'}>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem className={"w-1/2"}>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type={'password'} placeholder="··········" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirm_password"
                            render={({field}) => (
                                <FormItem className={"w-1/2"}>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type={'password'} placeholder="··········" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button formAction={'/auth/sign-up'} formMethod={"post"} aria-label="Register">Register</Button>
                </form>
            </Form>
        </div>
    );
}
