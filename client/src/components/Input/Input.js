import React from 'react'
import styles from "./Input.module.scss"
import { BsSearch } from "react-icons/bs"

export default function Input() {
    return (
        <div className={styles.input_container}>
            <BsSearch className={styles.icon}/>
            <input className={styles.field} type="text" onClick={() => console.log("input clicked")} placeholder="Search" />
        </div>
    )
}
