import React, { useState } from 'react'
import styles from "./Message.module.scss"
import { AiOutlineMore } from "react-icons/ai"
import { messageApi } from "../api/api"
import { Modal, openModal, closeModal } from '../../components/Modal/Modal';

export default function Message({ isYourMessage, removeMessage, message_content, message_date, username }) {
    const [isDeleteModalShowing, setIsDeleteModalShowing] = useState(false)

    const deleteMessage = async () => {
        const messageToDelete = {
            username,
            message_date,
            message_content
        }

        removeMessage(messageToDelete)

        try {
            const deleteResult = await messageApi.delete("/", {data: messageToDelete})

            console.log(deleteResult);            
        } catch (error) {
            console.log("err:", error.response.data);
        }
        closeModal(setIsDeleteModalShowing)
    }

    const DeleteMessageWarning = () => {
        return(
            <div className={styles.warning}>
                <h2>Are you sure want to delete this message?</h2>
                <div className={styles.button_wrapper}>
                    <button onClick={deleteMessage}>Delete Message</button>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className={`${isYourMessage ? styles.your_message : styles.other_user_message} ${styles.message}`}>
                <div className={styles.message_text}>{ message_content }</div>   
                <div className={styles.username}>{ username }</div>
                <div className={styles.date_wrapper}>
                    <div className={styles.date}>{ message_date }</div>
                    {
                        isYourMessage
                        ?
                        <AiOutlineMore className={styles.delete} onClick={() => openModal(setIsDeleteModalShowing)} />
                        :
                        null
                    }
                </div>
            </div>

            <Modal 
                show={isDeleteModalShowing}
                onHide={() => closeModal(setIsDeleteModalShowing)}
                modalHeader={"Delete Message"}
                modalContent={<DeleteMessageWarning />}
            />
        </>
    )
}
