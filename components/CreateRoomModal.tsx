'use client'
/**
 * This is a self-contained modal, with a presentation button that when clicked opens up the modal as a card.
 * The component should be placed wherever the button is needed.
 */
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {createRoom} from "@/actions/rooms";


export default function CreateRoomModal() {
    return (
        <>
            <Button onClick={() => {
                const modal = document.getElementById('create-room-modal') as HTMLDialogElement;
                modal.showModal();
            }} variant={'outline'}>Create Room</Button>
            <dialog className={'p-0 rounded-lg max-w-xl'} id={'create-room-modal'}>
                <Card>
                    <CardHeader>
                        <CardTitle>Create a room</CardTitle>
                        <CardDescription>Rooms are collections of users tied together as members.</CardDescription>
                    </CardHeader>
                    <form>
                        <CardContent>
                            <Label htmlFor={'create_room_name'}>Room Name</Label>
                            <Input name={'create_room_name'} type={'text'}/>
                        </CardContent>
                        <CardFooter className={'inline-flex w-full justify-between'}>
                            <Button type={'button'} onClick={() => {
                                const modal = document.getElementById('create-room-modal') as HTMLDialogElement;
                                modal.close();
                            }} variant={'outline'}>Cancel</Button>
                            <Button formAction={createRoom}>Create</Button>
                        </CardFooter>
                    </form>
                </Card>
            </dialog>
        </>

    )
}