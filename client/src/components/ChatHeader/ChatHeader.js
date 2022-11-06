import React, { useState, useRef } from 'react'
import styles from "./ChatHeader.module.scss"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { FiLogOut } from "react-icons/fi"
import me from "../../img/me.PNG"
import { Modal, openModal, closeModal} from "../Modal/Modal"

export default function ChatHeader({ signout, addNewChat }) {
    const [isAddChatModel, setIsAddChatModel] = useState(false)
    const formRef = useRef(null)

    const submitNewChat = (e) => {
        e.preventDefault()

        const formData = new FormData(formRef.current)
        const chatName = formData.get("chat")

        addNewChat(chatName)
        closeModal(setIsAddChatModel)
        formRef.current.reset()
    }

    const AddNewChat = () => {
        return (
            <form className={styles.add_new_chat} onSubmit={submitNewChat} ref={formRef}>
                <div className={styles.input_wrapper}>
                    <label>Chat name</label><br/>
                    <input name='chat' placeholder='Enter chat name' />
                </div>
                <br />
                <div className={styles.input_wrapper}>
                    <label>Add users</label><br/>
                    <input name='users' placeholder='Add users' />
                </div>
                <br />
                <button type="submit">Create new chat</button>
            </form>
        )
    }

    return (
        <>
            <div className={styles.chat_header}>
                <div className={styles.profile_picture}>
                    <img src={me} alt="me" />
                </div>
                <div className={styles.display_info}>
                    <div className={styles.title}>Chats</div>
                    <div className={styles.username}>darien88</div>
                </div>
                <div className={styles.links}>
                    <BsFillPlusCircleFill className={styles.link_icon} onClick={() => openModal(setIsAddChatModel)}/>
                    <FiLogOut className={styles.link_icon} onClick={signout}/>
                </div>
            </div>

            <Modal
                show={isAddChatModel}
                onHide={() => closeModal(setIsAddChatModel)}
                modalHeader={"Add new chat"}
                modalContent={<AddNewChat />}
            />
        </>
    )
}
