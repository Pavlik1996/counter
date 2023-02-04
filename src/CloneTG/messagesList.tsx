import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {MessageType} from "./main";
import s from './clonestyle.module.css'

type PropsType = {
    messages?: MessageType[]
    addMessage: (title: string) => void
    deleteFistMessage: () => void
    disableAdd: boolean
    disableDelete: boolean
    continueMessage: number
}

const MessagesList = (props: PropsType) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const infoMessage = error
        ? <p style={{color: 'red'}}>Please enter message ! </p>
        : <p style={{color: 'green'}}>Continue messages: {props.continueMessage}</p>

   
    const elemMessage = props.messages?.length ?
        props.messages.map(el => {
            return (
                <div>
                    {el.title}
                </div>
            )
        }) : <p>No Messages</p>

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !props.disableAdd) {
            onClickButtonAddMessageHandler()
        }
    }


    const onClickButtonAddMessageHandler = () => {
        if (title.trim()) {
            props.addMessage(title)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const onClickRemoveHandler = () => props.deleteFistMessage()


    return (
        <div>
            <div className={s.infoMessage}>
                {infoMessage}
            </div>
            <div className={s.container}>
                <input
                    disabled={props.disableAdd}
                    value={title}
                    onChange={onChangeInputHandler}
                    onKeyDown={onKeyDownInputHandler}
                />
                <button
                    disabled={props.disableAdd}
                    onClick={onClickButtonAddMessageHandler}>Send message
                </button>
                <button
                    onClick={onClickRemoveHandler}
                    disabled={props.disableDelete}
                >First Message Delete
                </button>
            </div>
            <div className={s.elemMessage}>
                {elemMessage}
            </div>
        </div>


    );
};

export default MessagesList;