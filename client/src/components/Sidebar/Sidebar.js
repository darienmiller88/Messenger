import React, { useRef } from 'react'
import styles from "./Sidebar.module.scss"
import { BsFillPersonPlusFill, BsMessenger } from "react-icons/bs"

export default function Siderbar() {
    const sidebarRef = useRef(null)

    const sidebarIconOnclick = e => {        
        sidebarRef.current.querySelectorAll("div").forEach(element => {
            element.firstElementChild.classList.remove(styles.active)
        });
        
        e.target.classList.add(styles.active)
    }

    return (
        <div className={styles.sidebar} ref={sidebarRef} > 
            <div className={styles.icon_wrapper}>
                <BsMessenger className={`${styles.icon} ${styles.active}`} onClick={sidebarIconOnclick} />
            </div>
            <div className={styles.icon_wrapper} >
                <BsFillPersonPlusFill className={styles.icon} onClick={sidebarIconOnclick}/>
            </div>
        </div>
    )
}
