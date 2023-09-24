import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Messages from "@/components/Messages";
import BackButton from "@/components/BackButton";

export default function Login() {

    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <BackButton target={'/'} />

            <form className={'flex flex-col gap-4'}>
                <div>
                    <label htmlFor={'email'}>Email </label>
                    <Input name={'email'} type={'email'} placeholder={'name@example.com'}/>
                </div>

                <div>
                    <label htmlFor={'password'}>Password </label>
                    <Input name={'password'} type={'password'} placeholder={'•••••••••••••••'}/>
                </div>

                <Button formAction={'/auth/sign-in'} formMethod={"post"}>Login</Button>
            </form>

            <Messages />
        </div>
    )
}
