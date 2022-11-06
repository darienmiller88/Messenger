import React, { useState } from 'react'
import styles from "./ChatsWrapper.module.scss"
import ChatWindow from '../ChatWindow/ChatWindow'
import SearchWindow from '../SearchWindow/SearchWindow'
import ChatsContainer from '../ChatsContainer/ChatsContainer'
import { useNavigate } from "react-router-dom";

export default function ChatsWrapper({ signout }) {
    // const [isChatWindowActive, setIsChatWindowActive] = useState(false)
    const [isSearchWindowActive, setIsSearchWindowActive] = useState(false)
    const [chatName, setChatName] = useState("Public")
    const navigate = useNavigate()

    const openChatWindowMobile = (chatName) => {
        localStorage.setItem("chat_name", chatName)
        navigate(`/home/${chatName}`, {state: chatName})
    }

    const openChatWindowDesktop = (chatName) => {
        setChatName(chatName)
        localStorage.setItem("chat_name", chatName)
    }

    const PhoneView = () => {
        return(
            <div className={styles.phone_view}>
                <ChatsContainer signout={signout} chatOnClick={openChatWindowMobile}/>
                <SearchWindow isSearchWindowActive={isSearchWindowActive} setIsSearchWindowActive={() => setIsSearchWindowActive(!isSearchWindowActive)}/>
            </div>
        )
    }

    const DesktopView = () => {
        return(
            <div className={styles.desktop_view}>
                <ChatsContainer signout={signout} chatOnClick={openChatWindowDesktop} />
                <ChatWindow isChatWindowActive={true} chatName={chatName}/>
            </div>
        )
    }

    return (
        <div className={styles.chats_wrapper}>
            <PhoneView />
            <DesktopView />
        </div>
    )
}
