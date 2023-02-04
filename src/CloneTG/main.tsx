import React, {useState} from 'react';
import {v1} from "uuid";
import MessagesList from "./messagesList";

export type MessageType = {
    id: string
    title: string
}

const Main = () => {
    const [messages, setMessages] = useState<MessageType[]>([])

    const maxMessagesValue = 5
    const minMessagesValue = 0

    const continueMessage = maxMessagesValue - messages.length

    const disableAdd = messages.length === maxMessagesValue
    const disableDelete = messages.length === minMessagesValue

    const addMessage = (title: string) => {
        setMessages([{id: v1(), title: title}, ...messages])
    }

    const deleteFistMessage = () => {
        const deleteMessage = messages.splice(0, 1)
        setMessages(messages.filter(el => el.id !== deleteMessage[0].id))
    }

    return (
        <div>
            <MessagesList
                addMessage={addMessage}
                deleteFistMessage={deleteFistMessage}
                messages={messages}
                disableAdd={disableAdd}
                disableDelete={disableDelete}
                continueMessage={continueMessage}
            />
        </div>
    );
};

export default Main;