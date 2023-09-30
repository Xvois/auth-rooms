'use client'
/**
 * This is a self-contained modal, with a presentation button that when clicked opens up the modal as a card.
 * The component should be placed wherever the button is needed.
 */
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {deleteRoom} from "@/actions/rooms";
import {useState} from "react";

export default function DeleteRoomModal(props: {room_id: number}) {
    const {room_id} = props;
    const [input, setInput] = useState('');
    return (
        <>
            <Button onClick={() => {
                const modal = document.getElementById('delete-room-modal') as HTMLDialogElement;
                modal.showModal();
            }} variant={'destructive'}>Delete Room</Button>
            <dialog className={'p-0 rounded-lg max-w-xl'} id={'delete-room-modal'}>
                <Card>
                    <CardHeader>
                        <CardTitle>Delete room</CardTitle>
                        <CardDescription>Type in the ID of this room to confirm.</CardDescription>
                    </CardHeader>
                    <form>
                        <CardContent>
                            <Label htmlFor={'delete_room_id'}>Room ID</Label>
                            <Input onChange={(event) => setInput(event.target.value)} placeholder={String(room_id)} name={'delete_room_id'} type={'text'}/>
                        </CardContent>
                        <CardFooter className={'inline-flex w-full justify-between'}>
                            <Button type={'button'} onClick={() => {
                                const modal = document.getElementById('delete-room-modal') as HTMLDialogElement;
                                modal.close();
                            }} variant={'outline'}>Cancel</Button>
                            <Button disabled={ !(Number(input) === room_id) } formAction={deleteRoom} variant={'destructive'}>Create</Button>
                        </CardFooter>
                    </form>
                </Card>
            </dialog>
        </>

    )
}