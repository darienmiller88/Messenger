import React, { useState } from 'react'
import { BsSearch, BsFillPlusCircleFill } from "react-icons/bs"
import { FiLogOut } from "react-icons/fi"
import styles from "./Chats.module.scss"
import ChatWindow from '../ChatWindow/ChatWindow'
import me from "../../img/me.PNG"
import SearchWindow from '../SearchWindow/SearchWindow'
import Input from "../../components/Input/Input"
import ChatsContainer from '../ChatsContainer/ChatsContainer'

export default function Chats({ signout }) {
    const [isChatWindowActive, setIsChatWindowActive] = useState(false)
    const [isSearchWindowActive, setIsSearchWindowActive] = useState(false)

    const PhoneView = () => {
        return(
            <div className={styles.phone_view}>
                <ChatsContainer isChatWindowActive={isChatWindowActive} setIsChatWindowActive={() => setIsChatWindowActive(!isChatWindowActive)}/>

                {/* Finally, the last section contains misc. info for display */}
                <SearchWindow isSearchWindowActive={isSearchWindowActive} setIsSearchWindowActive={() => setIsSearchWindowActive(!isSearchWindowActive)}/>
                <ChatWindow isChatWindowActive={isChatWindowActive} setIsChatWindowActive={() => setIsChatWindowActive(!isChatWindowActive)}/>
            </div>
        )
    }

    const DesktopView = () => {
        return(
            <div className={styles.desktop_view}>
                <div className={styles.chats}>
                    chats
                </div>
                <ChatWindow isChatWindowActive={true}/>
            </div>
        )
    }

    return (
        <div className={styles.chats_wrapper}>
            <PhoneView />
            <DesktopView />
        </div>
    )
}
