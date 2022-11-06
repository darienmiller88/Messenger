import React from 'react'
import styles from "./Chat.module.scss"
import me from "../../img/me.PNG"
import p from "../../img/p.png"
import defaultPic from "../../img/default.jpg"

export default function Chat({ chatName, isPublicChat, chatOnClick }) {
    return (
        <div className={styles.chat} onClick={chatOnClick} > 
            <div className={styles.profile_picture}>
                <img src={isPublicChat ? p : defaultPic} alt="me" />
            </div>
            <div className={styles.chat_description}>
                <div className={styles.username}>{ chatName }</div>
                <div className={styles.last_message_wrapper}>
                    <div className={styles.last_message}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ante urna, sagittis vel sapien efficitur, fringilla finibus felis. Aliquam euismod augue lorem.</div>
                    <div className={styles.timestamp}>10:42 PM</div>
                </div>
            </div>
        </div>
    )
}
