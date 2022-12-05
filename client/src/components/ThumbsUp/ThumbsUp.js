import React from 'react'
import styles from "./ThumbsUp.module.scss"

export default function ThumbsUp({ username, isYourThumbsUp }) {
    return (
        <div className={`${styles.thumbs_up_wrapper} ${isYourThumbsUp ? styles.your_thumbs_up : styles.other_thumbs_up}`}>
            <div>
                👍
            </div>
            <div className={styles.username}>
                { username }
            </div>
        </div>
    )
}
