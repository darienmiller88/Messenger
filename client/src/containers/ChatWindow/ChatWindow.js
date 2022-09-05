import React, { useState, useRef, useEffect } from 'react'
import styles from "./ChatWindow.module.scss"
import Picker from 'emoji-picker-react';
import { FaArrowLeft, FaThumbsUp } from "react-icons/fa"
import { BiSend } from "react-icons/bi"
import { BsFillTelephoneFill, BsCameraVideoFill, BsInfoCircleFill, BsFillEmojiSmileFill, BsCardImage } from "react-icons/bs"
import me from "../../img/me.PNG"
import Message from '../../components/Message/Message';
import Modal from '../../components/Modal/Modal';

export default function ChatWindow({ isChatWindowActive, setIsChatWindowActive }) {
    const [isDeleteModalShowing, setIsDeleteModalShowing] = useState(false)
    const [inputText, setInputText] = useState("")
    const [messages, setMessages] = useState([ "hehe", "red", "ehfd"])
    const [previousScrollHeight, setPreviousScrollHeight] = useState(0)
    const messageWrapperInnerRef = useRef(null)
    const messagesEndRef = useRef(null)

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: "smooth"})            
        }
    }, [messages])

    const openModal = () => {
        document.querySelector("body").style.overflow = "hidden"
        setIsDeleteModalShowing(true)
    }

    const closeModal = () => {
        document.querySelector("body").style.overflow = 'visible';
        setIsDeleteModalShowing(false)
    }

    const DeleteMessageWarning = () => {
        return(
            <div className={styles.warning}>
                <h2>Are you sure want to delete this message?</h2>
                <div className={styles.button_wrapper}>
                    <button onClick={closeModal}>Delete Message</button>
                </div>
            </div>
        )
    }

    const appendMessage = () => {
        setMessages([...messages, inputText])
        setInputText("")
    }

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
                <div className={styles.message_wrapper_inner} ref={messageWrapperInnerRef}>
                    {
                        messages.map((message, i) => {
                            return <Message key={i} isYourMessage={i % 2 === 0 ? true : false} openModal={openModal} message={message}/>
                        })
                    }

                    {/* This empty div will be used to scroll the messages to the bottom */}
                    <div ref={messagesEndRef} />
                </div>
                {/* <Picker onEmojiClick={onEmojiClick}/> */}
            </div>

            <div className={styles.input_wrapper}>
                <BsCardImage className={styles.icon} />
                <div className={styles.input_container}>
                    <textarea rows={1} placeholder='Aa' className={styles.message_input} value={inputText} onChange={e => setInputText(e.target.value)}/>
                    <BsFillEmojiSmileFill className={styles.icon}/>
                </div>  
                {
                    inputText.length === 0
                    ?
                    <FaThumbsUp className={styles.icon} />
                    :
                    <BiSend className={styles.icon} onClick={appendMessage}/>
                }
            </div>

            <Modal 
                show={isDeleteModalShowing}
                onHide={closeModal}
                modalHeader={"Delete Message"}
                modalContent={<DeleteMessageWarning />}
            />
        </div>
        :
        null
    )
}