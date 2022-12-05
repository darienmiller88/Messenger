import React, { useState, useRef, useEffect } from 'react'
import styles from "./ChatWindow.module.scss"
import Picker from 'emoji-picker-react';
import { FaArrowLeft, FaThumbsUp } from "react-icons/fa"
import { BiSend } from "react-icons/bi"
import { BsFillTelephoneFill, BsCameraVideoFill, BsInfoCircleFill, BsFillEmojiSmileFill, BsCardImage } from "react-icons/bs"
import me from "../../img/me.PNG"
import Message from '../../components/Message/Message';
import ThumbsUp from '../../components/ThumbsUp/ThumbsUp';
import { Modal, openModal, closeModal } from '../../components/Modal/Modal';

const socket = new WebSocket(window.location.hostname === "localhost" ? "ws://localhost:8080/ws" : "wss://facebookmessengerapi.herokuapp.com/ws")

export default function ChatWindow({ isChatWindowActive, setIsChatWindowActive, chatName }) {
    const [isDeleteModalShowing, setIsDeleteModalShowing] = useState(false)
    const [inputText, setInputText] = useState("")
    const [messages, setMessages] = useState([])
    const messageWrapperInnerRef = useRef(null)
    const messagesEndRef = useRef(null)
    
    useEffect(() => {
        socket.onopen = () => {
            console.log("Successfully Connected");
        }

        socket.onmessage = msg => {
            const parsedMessage = JSON.parse(msg.data)
            
            console.log(parsedMessage);
            setMessages(prevState => [...prevState, {isYourMessage: false, body: parsedMessage.body}])
        };

        socket.onclose = event => {
            console.log("Socket Closed Connection: ", event);
        };

        socket.onerror = error => {
            console.log("Socket Error: ", error);
        };
    }, [])

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: "smooth"})            
        }
    }, [messages])

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
        setMessages([...messages, {body: inputText, isYourMessage: true}])
        setInputText("")      
        socket.send(JSON.stringify({body: inputText, username: "darien88"}))
    }

    const appendThumbsUp = () => {
        setMessages([...messages, {body: '👍', isYourMessage: true}])
        socket.send(JSON.stringify({body: '👍', username: "darien88"}))
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
                    <div className={styles.username}>{chatName}</div>
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
                            return message.body === '👍' ?
                            <ThumbsUp isYourThumbsUp={message.isYourMessage} username={"darien88"}/>
                            // <div key={i} className={message.isYourMessage ? styles.your_thumbs_up : styles.other_thumbs_up }>{ message.body }</div>
                            :
                            <Message key={i} isYourMessage={message.isYourMessage} openModal={() => openModal(setIsDeleteModalShowing)} message={message.body}/>
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
                    <textarea 
                        rows={1} 
                        placeholder='Aa' 
                        className={styles.message_input} 
                        value={inputText} 
                        onChange={e => setInputText(e.target.value)}
                    />
                    <BsFillEmojiSmileFill className={styles.icon}/>
                </div>  
                {
                    inputText.length === 0
                    ?
                    <FaThumbsUp className={`${styles.icon} ${styles.add_message}`} onClick={appendThumbsUp} />
                    :
                    <BiSend className={`${styles.icon} ${styles.add_message}`} onClick={appendMessage}/>
                }
            </div>

            <Modal 
                show={isDeleteModalShowing}
                onHide={() => closeModal(setIsDeleteModalShowing)}
                modalHeader={"Delete Message"}
                modalContent={<DeleteMessageWarning />}
            />
        </div>
        :
        null
    )
}