import React from 'react'
import styles from "./ChatHeader.module.scss"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { FiLogOut } from "react-icons/fi"
import me from "../../img/me.PNG"

export default function ChatHeader() {
    return (
        <div className={styles.chat_header}>
                <div className={styles.profile_picture}>
                    <img src={me} alt="me" />
                </div>
                <div className={styles.display_info}>
                    <div className={styles.title}>Chats</div>
                    <div className={styles.username}>darien88</div>
                </div>
                <div className={styles.links}>
                    <BsFillPlusCircleFill className={styles.link_icon}/>
                    <FiLogOut className={styles.link_icon} />
                </div>
        </div>
    )
}
