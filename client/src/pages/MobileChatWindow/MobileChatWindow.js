import React, { useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";

import ChatWindow from '../../containers/ChatWindow/ChatWindow'

export default function MobileChatWindow() {
    const [isChatWindowActive, setIsChatWindowActive] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()

    console.log("props:", location.state);

    const backToHome = () => {
        setIsChatWindowActive(false)
        navigate("/home")
    }

    return(
        <ChatWindow isChatWindowActive={isChatWindowActive} setIsChatWindowActive={backToHome} chatName={location.state}/>
    )
}
