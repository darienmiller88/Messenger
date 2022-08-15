import React from 'react'
import styles from "./ChatWindow.module.scss"
import { FaArrowLeft } from "react-icons/fa"
import { BsFillTelephoneFill, BsCameraVideoFill, BsInfoCircleFill } from "react-icons/bs"
import me from "../../img/me.PNG"

export default function ChatWindow({ isChatWindowActive, setIsChatWindowActive }) {
    return (
        isChatWindowActive
        ?
        <div className={styles.chat_window}>
            <div className={styles.chat_header}>
                <div className={styles.arrow_wrapper}>
                    <FaArrowLeft onClick={setIsChatWindowActive}  />
                </div>
                <div className={styles.img_wrapper}>
                    <img src={me} alt="profile-pic"/>
                    <div className={styles.username}>darien88</div>
                </div>
                <div className={styles.links_wrapper}>
                    <BsFillTelephoneFill className={styles.icon} />
                    <BsCameraVideoFill className={styles.icon}  />
                    <BsInfoCircleFill className={styles.icon} />
                </div>
            </div>

            <div className={styles.messages_wrapper}>
                ChatWindow

            </div>

            <div className={styles.input_wrapper}>
                <input placeholder='Aa'/>
            </div>
        </div>
        :
        null
    )
}
