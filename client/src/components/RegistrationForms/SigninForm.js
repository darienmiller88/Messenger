import React, { useState } from 'react'
import logo from "../../img/logo.png"
import styles from "./Form.module.scss"
import { userApi } from '../api/api'
import { useNavigate } from "react-router-dom";

export default function SigninForm({ changeToSignup }) {
    const [username, setUsernameText] = useState("")
    const [password, setPasswordText] = useState("")
    const [signinError, setSigninError] = useState("")
    const [isSigninError, setIsSigninError] = useState(false)
    const navigate = useNavigate()

    const login = async () => {
        const data = {
            username,
            password
        }

        try {
            await userApi.post("/signin", data)
            localStorage.setItem("username", username)

            setIsSigninError(false)
            setUsernameText("")
            setPasswordText("")

            navigate("/home")
        } catch (error) {
            setIsSigninError(true)
            setSigninError(error.response.data["signinError"])
        }
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
                <input placeholder='Username' value={username} onChange={e => setUsernameText(e.target.value)}/>
            </div>
            <div className={styles.user_input}>
                <input placeholder='Password' type="password" value={password} onChange={e => setPasswordText(e.target.value)}/>
            </div>
            {
                isSigninError ? <div className={styles.error}>{signinError}</div> : null
            }
            {/* <button onClick={login} className={styles.login_button}>Login</button>
            <br/>
            <div className={styles.forgot}>Forgot your password?</div>
            <button onClick={changeToSignup} className={styles.create_account}>Create Account</button> */}
            <button onClick={() => navigate("/home")}>Check out home page!</button>
        </div>
    )
}
