import React, { useState } from 'react'
import styles from "./ChatsContainer.module.scss"
import ChatHeader from "../../components/ChatHeader/ChatHeader"
import Chat from "../../components/Chat/Chat"
import ChatFooter from "../../components/ChatFooter/ChatFooter"
import Input from '../../components/Input/Input'

export default function ChatsContainer({ signout, chatOnClick }) {
    const [chats, setChats] = useState(["L.R.D.D", "Dalton", "Vicky"])

    const addNewChat = (chatName) => {
        setChats([...chats, chatName])
    }

    console.log("chats:", chats);

    return (
        <div className={styles.chats_container}>
            <ChatHeader signout={signout} addNewChat={addNewChat}/>
            <div className={styles.chats}>
                <Input />
                <Chat chatName={"Public"} isPublicChat={true} chatOnClick={() => chatOnClick("Public")}/>
                {
                    chats.map((chatName, i) => {
                        return <Chat key={i} chatName={chatName} isPublicChat={false} chatOnClick={() => chatOnClick(chatName)}/>
                    })
                }
            </div>
            <ChatFooter />
        </div>
    )
}
