import React from 'react'
import styles from "./SearchWindow.module.scss"
import { FaArrowLeft } from "react-icons/fa"


export default function SearchWindow({ isSearchWindowActive, setIsSearchWindowActive  }) {
    return (
        isSearchWindowActive
        ?
        <div>
            <FaArrowLeft onClick={setIsSearchWindowActive}/>
            SearchUser
        </div>
        :
        null
    )
}
