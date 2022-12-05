import React, { useState } from 'react'
import "./ChatFooter.scss"
import { BsFillPeopleFill, BsFillPersonPlusFill, BsMessenger } from "react-icons/bs"
import { BiMessageRounded } from "react-icons/bi"
import { useNavigate } from "react-router-dom";

export default function ChatFooter({ initializeFirstIcon, initializeFriendReq}) {
    const [isFirstIconActive, setIsFirstIconActive] = useState(true)
    const [isSecondIconActive, setIsSecondIconActive] = useState(false)
    const [isThirdIconActive, setIsThirdIconActive] = useState(false)
    const navigate = useNavigate()

    const changeActive = (e) => {
        console.log("target:", e.target.parentElement.parentElement.classList);
        // if (e.target.classList.contains("icon_container_active") || ) {
        //     e.target.classList.remove("icon_container_active")
        // }else{
        //     e.target.classList.add("icon_container_active")
        // }
    }

    const toggleFirstIcon = () => {
        setIsFirstIconActive(true)   
        setIsSecondIconActive(false)
        setIsThirdIconActive(false)
    }

    const toggleSecondIcon = () => {
        setIsFirstIconActive(false)   
        setIsSecondIconActive(true)
        setIsThirdIconActive(false)
    }

    const toggleThirdIcon = () => {
        setIsFirstIconActive(false)   
        setIsSecondIconActive(false)
        setIsThirdIconActive(true)
    }
// onClick={() => navigate("/home/friend-requests")}
//onClick={() => navigate("/home")}
    return (
        <div className='chat_footer'>
            <div className={isFirstIconActive ? "icon_container icon_container_active" : "icon_container"} onClick={toggleFirstIcon}>
                <div className='icon'>
                    <BsMessenger />
                </div>
                <div>Chats</div>
            </div>
            <div className={isSecondIconActive ? "icon_container icon_container_active" : "icon_container"} onClick={toggleSecondIcon}>
                <div className='icon'>
                    <BsFillPersonPlusFill />
                </div>
                <div>Friend Requests</div>
            </div>
            <div className={isThirdIconActive ? "icon_container icon_container_active" : "icon_container"} onClick={toggleThirdIcon}>
                 <div className='icon'>
                    <BsFillPeopleFill/>
                </div>
                <div>People</div>
            </div>
        </div>
    )
}
