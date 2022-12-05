import React from 'react'
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"
import styles from "./FriendRequests.module.scss"
import ChatFooter from "../../components/ChatFooter/ChatFooter"
import FriendRequest from "../../components/FriendRequest/FriendRequest"

export default function FriendRequests() {
    const navigate = useNavigate()

    return (
        <div className={styles.friend_requests_wrapper}>
            <FaArrowLeft className={styles.icon} onClick={() => navigate("/home")}/>
            <h1>Friend Requests</h1>
            <div className={styles.friend_requests}>
                <FriendRequest username={"Dalton Patterson"} numMutualFriends={4} />
                <FriendRequest username={"Denise"} numMutualFriends={2}/>
                <FriendRequest username={"Vicky"} numMutualFriends={5}/>
            </div>
            <ChatFooter />
        </div>
    )
}
