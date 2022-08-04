import React from 'react'
import styles from "./ChatWindow.module.scss"

export default function ChatWindow({ isChatWindowActive, setIsChatWindowActive, isMobile }) {
    return (
        isChatWindowActive
        ?
        <div className={styles.chat_window}>
            ChatWindow
            <br />
            <button onClick={setIsChatWindowActive} className={styles.show_chats}>Click to show chats</button>
        </div>
        :
        null
    )
}
