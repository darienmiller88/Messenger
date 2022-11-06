import React from 'react'
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"
import { BsFillPeopleFill } from "react-icons/bs"
import pic from "../../img/default.jpg"
import styles from "./FriendRequests.module.scss"
import ChatFooter from "../../components/ChatFooter/ChatFooter"

export default function FriendRequests() {
    const navigate = useNavigate()

    const FriendRequest = ({ username, numMutualFriends }) => {
        return(
            <div className={styles.friend_request}>
                <div className={styles.user_image}>
                    <img src={pic} alt='user'/>
                </div>
                <div className={styles.friend_request_information}>
                    <div>
                        <b>{username}</b>
                    </div>
                    <div className={styles.mutual_friends_wrapper}>
                        <BsFillPeopleFill className={styles.mutual_friends_icon}/>
                        <div className={styles.mutual_friends}>{numMutualFriends} mutual friends</div>
                    </div>
                    <button className={styles.confirm}>Confirm</button>
                    <button className={styles.delete}>Delete</button>
                </div>
            </div>
        )
    }

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
