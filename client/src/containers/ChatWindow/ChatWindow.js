import React, { useState, useRef, useEffect } from 'react'
import styles from "./ChatWindow.module.scss"
import Picker from 'emoji-picker-react';
import { FaArrowLeft, FaThumbsUp } from "react-icons/fa"
import { BiSend } from "react-icons/bi"
import { BsFillTelephoneFill, BsCameraVideoFill, BsInfoCircleFill, BsFillEmojiSmileFill, BsCardImage } from "react-icons/bs"
import me from "../../img/me.PNG"
import Message from '../../components/Message/Message';
import ThumbsUp from '../../components/ThumbsUp/ThumbsUp';
import { messageApi } from "../../components/api/api"

const socket = new WebSocket(window.location.hostname === "localhost" ? "ws://localhost:8080/ws" : "wss://facebookmessengerapi.fly.dev/ws")

export default function ChatWindow({ isChatWindowActive, setIsChatWindowActive, chatName }) {
    const [inputText, setInputText] = useState("")
    const [messages, setMessages] = useState([])
    const [isInputDisabled, setIsInputDisabled] = useState(false)
    const [isThumbsUpDisabled, setIsThumbsUpDisabled] = useState(false)
    const messageWrapperInnerRef = useRef(null)
    const messagesEndRef = useRef(null)
    
    useEffect(() => {
        (async () => {
            const messagesResponse = await messageApi.get()

            messagesResponse.data.forEach(message => {
                setMessages(messages => [...messages, {...message, isYourMessage: true}])
            })
    
            socket.onopen = () => {
                console.log("Successfully Connected");
            }
    
            socket.onmessage = msg => {
                const parsedMessage = JSON.parse(msg.data)
                
                if(parsedMessage.type === 1){
                    console.log(parsedMessage);
                    setMessages(prevState => [...prevState, {
                        isYourMessage: false, 
                        message_content: parsedMessage.message_content, 
                        username: parsedMessage.username, 
                        message_date: parsedMessage.message_date
                    }])
                }else{
                    console.log("User connected:", parsedMessage.body);
                }
            };
    
            socket.onclose = event => {
                console.log("Socket Closed Connection: ", event);
            };
    
            socket.onerror = error => {
                console.log("Socket Error: ", error);
            };
        })()
    }, [])

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView()            
        }
    }, [messages])

    const appendMessage = () => {
        const message = {
            message_content: inputText, 
            message_date:    new Date().toLocaleString(), 
            username:        "darien88", 
        }

        setMessages([...messages, {...message, isYourMessage: true}])
        setInputText("")      
        socket.send(JSON.stringify(message))
        setIsInputDisabled(true)

        setTimeout(() => {
            setIsInputDisabled(false)
        }, 1500);
    }

    const appendThumbsUp = () => {
        const message = {
            message_content: '👍', 
            message_date:    new Date().toLocaleString(),
            username:        "darien88"
        }

        setMessages([...messages, {...message, isYourMessage: true}])
        socket.send(JSON.stringify(message))
        setIsThumbsUpDisabled(true)

        setTimeout(() => {
            setIsThumbsUpDisabled(false)
        }, 2000);
    }

    const removeMessage = (messageToDelete) => {
        setMessages(messages.filter(message => {
            return !(message.message_content === messageToDelete.message_content
            && message.message_date === messageToDelete.message_date
            && message.username === messageToDelete.username)
        }))
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
                            :
                            <Message 
                                key={i} 
                                isYourMessage={message.isYourMessage} 
                                message_content={message.message_content}
                                message_date={message.message_date}
                                username={message.username}
                                removeMessage={removeMessage}
                            />
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
                        disabled={isInputDisabled}
                    />
                    <BsFillEmojiSmileFill className={styles.icon}/>
                </div>  
                {
                    inputText.length > 0 ?
                    <BiSend className={`${styles.icon} ${styles.add_message}`} onClick={appendMessage} disabled={isThumbsUpDisabled}/>
                    :
                    inputText.length === 0 && !isThumbsUpDisabled ?
                    <FaThumbsUp className={`${styles.icon} ${styles.add_message}`} onClick={appendThumbsUp} />
                    :
                    null
                }
            </div>
        </div>
        :
        null
    )
}