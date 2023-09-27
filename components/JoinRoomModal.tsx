'use client'
/**
 * This is a self-contained modal, with a presentation button that when clicked opens up the modal as a card.
 * The component should be placed wherever the button is needed.
 */
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {joinRoom} from "@/actions/rooms";


export default function JoinRoomModal() {
    return (
        <>
            <Button onClick={() => {
                const modal = document.getElementById('join-room-modal') as HTMLDialogElement;
                modal.showModal();
            }}>Join Room</Button>
            <dialog className={'p-0 rounded-lg max-w-xl'} id={'join-room-modal'}>
                <Card>
                    <CardHeader>
                        <CardTitle>Join a room</CardTitle>
                        <CardDescription>You must enter the unique ID of the room to join. Alternatively, you can click on an invite link from a member.</CardDescription>
                    </CardHeader>
                    <form>
                        <CardContent>
                            <Label htmlFor={'join_room_id'}>Room ID</Label>
                            <Input name={'join_room_id'} type={'text'}/>
                        </CardContent>
                        <CardFooter className={'inline-flex w-full justify-between'}>
                            <Button type={'button'} onClick={() => {
                                const modal = document.getElementById('join-room-modal') as HTMLDialogElement;
                                modal.close();
                            }} variant={'outline'}>Cancel</Button>
                            <Button formAction={joinRoom}>Join</Button>
                        </CardFooter>
                    </form>
                </Card>
            </dialog>
        </>

    )
}