import React from 'react'
import styles from "./Message.module.scss"
import { AiOutlineMore } from "react-icons/ai"

export default function Message({ isYourMessage, openModal, message }) {
    return (
        <>
            <div className={`${isYourMessage ? styles.your_message : styles.other_user_message} ${styles.message}`}>
                <div className={styles.message_text}>{ message }</div>   
                <div className={styles.date_wrapper}>
                    <div className={styles.date}>9/12/2022 12:30 AM</div>
                    <AiOutlineMore className={styles.delete} onClick={openModal} />
                </div>
            </div>
        </>
    )
}
