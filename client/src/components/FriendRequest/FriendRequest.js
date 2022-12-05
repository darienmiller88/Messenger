import React from 'react'
import styles from "./FriendRequest.module.scss"
import pic from "../../img/default.jpg"
import { BsFillPeopleFill } from "react-icons/bs"

export default function FriendRequest({ username, numMutualFriends }) {
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
