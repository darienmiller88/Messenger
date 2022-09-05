import React from 'react'
import styles from "./ChatsContainer.module.scss"
// import { BsFillPlusCircleFill } from "react-icons/bs"
import ChatHeader from "../../components/ChatHeader/ChatHeader"
import Chat from "../../components/Chat/Chat"
import ChatFooter from "../../components/ChatFooter/ChatFooter"
import Input from '../../components/Input/Input'

export default function ChatsContainer({ isChatWindowActive, setIsChatWindowActive }) {
    return (
        isChatWindowActive
        ?
        null
        :
        <div className={styles.chats_container}>
            <ChatHeader />
            <div className={styles.chats}>
                <Input />
                {
                    [10, 10, 10, 10, 10].map((chat, i) => {
                        return <Chat key={i} openChatWindow={setIsChatWindowActive} />
                    })
                }
            </div>
            <ChatFooter />
        </div>
    )
}
