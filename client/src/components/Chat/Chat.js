import React from 'react'
import styles from "./Chat.module.scss"
import me from "../../img/me.PNG"

export default function Chat({ openChatWindow }) {
    return (
        <div className={styles.chat} onClick={openChatWindow}> 
            <div className={styles.profile_picture}>
                <img src={me} alt="me" />
            </div>
            <div className={styles.chat_description}>
                <div className={styles.username}>darien88</div>
                <div className={styles.last_message_wrapper}>
                    <div className={styles.last_message}>This is a message</div>
                    <div className={styles.timestamp}>9:42 PM</div>
                </div>
            </div>
        </div>
    )
}
