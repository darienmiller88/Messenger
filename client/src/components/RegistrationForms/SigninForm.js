import React, { useState } from 'react'
import logo from "../../img/logo.png"
import styles from "./Form.module.scss"

export default function SigninForm({ changeToSignup }) {
    const [usernameText, setUsernameText] = useState("")
    const [passwordText, setPasswordText] = useState("")

    const login = () => {
        console.log("username:", usernameText, "password:", passwordText);
        setUsernameText("")
        setPasswordText("")
    }

    return (
        <div className={`${styles.signin} ${styles.registration_form}`}>
            <div className={styles.logo_wrapper}>
                <img src={logo} alt="logo" height="100px" width="100px"/>
            </div>
            <div className={styles.title}>
                Sign in to get started
            </div>
            <div className={styles.user_input}>
                <input placeholder='Username' value={usernameText} onChange={e => setUsernameText(e.target.value)}/>
            </div>
            <div className={styles.user_input}>
                <input placeholder='Password' type="password" value={passwordText} onChange={e => setPasswordText(e.target.value)}/>
            </div>
            <button onClick={login} className={styles.login_button}>Login</button>
            <br/>
            <div className={styles.forgot}>Forgot your password?</div>
            <button onClick={changeToSignup} className={styles.create_account}>Create Account</button>
        </div>
    )
}
