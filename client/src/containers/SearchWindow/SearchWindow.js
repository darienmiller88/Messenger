import React from 'react'
import styles from "./SearchWindow.module.scss"

export default function SearchWindow({ isSearchWindowActive, setIsSearchWindowActive }) {
    return (
        isSearchWindowActive
        ?
        <div>SearchUser</div>
        :
        null
    )
}
