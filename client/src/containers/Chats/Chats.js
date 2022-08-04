import React, { useState } from 'react'
import styles from "./Chats.module.scss"
import ChatWindow from '../ChatWindow/ChatWindow'

export default function Chats({ signout }) {
    const [isChatWindowActive, setIsChatWindowActive] = useState(false)

    const PhoneView = () => {
        return(
            <div className={styles.phone_view}>
                <div className={styles.chats}>
                    Welcome {localStorage.getItem("username")}! Here are your chats.
                    <br />
                    <button onClick={() => setIsChatWindowActive(!isChatWindowActive)}>Click to open chat window</button>
                    <br />
                    <button onClick={signout}>signout</button>
                </div>
                <ChatWindow isChatWindowActive={isChatWindowActive} setIsChatWindowActive={() => setIsChatWindowActive(!isChatWindowActive)}/>
            </div>
        )
    }

    const DesktopView = () => {
        return(
            <div className={styles.desktop_view}>
                <div className={styles.chats}>
                    chats
                </div>
                <ChatWindow isChatWindowActive={true}/>
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
