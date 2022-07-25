import React, { useRef, useState } from 'react'
import logo from "../../img/logo.png"
import styles from "./Form.module.scss"
import { userApi } from '../api/api'

export default function SignupForm({ changeToSignup }) {
    const formRef = useRef(null)
    const [usernameError, setUsernameError] = useState("")
    const [isUsernameError, setIsUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState("")
    const [isPasswordError, setIsPasswordError] = useState(false)

    const submitForm = async (e) =>  {
        e.preventDefault()

        const formData     = new FormData(formRef.current)
        const username     = formData.get("username")
        const password     = formData.get("password")
        const email        = formData.get("email")
        const phone_number = formData.get("phone")
        const data = {
            username, 
            password,
            email,
            phone_number,
        }

        try {
            const response = await userApi.post("/signup", data)
            console.log("response:", response);
            setIsUsernameError(false)
            setIsPasswordError(false)

            formRef.current.reset()
        } catch (error) {
            if(error.response.data["password"]){
                console.log("password error:", error.response.data["password"]);
                setIsPasswordError(true)
                setIsUsernameError(false)
                setPasswordError(error.response.data["password"])
            }
            
            if(error.response.data["username"]){
                setIsUsernameError(true)
                setIsPasswordError(false)
                setUsernameError(error.response.data["username"])
            }

        }

        console.log("data:", data);
    }

    return (
        <form className={`${styles.signup} ${styles.registration_form}`} onSubmit={submitForm} ref={formRef}> 
            <div className={styles.logo_wrapper}>
                <img src={logo} alt="logo" height="100px" width="100px"/>
            </div>
            <div className={styles.title}>
                Sign up to join Messenger!
            </div>
            <div className={styles.user_input}>
                <input placeholder='Username' name='username' minLength={5} maxLength={20} required/>
            </div>
            {
                isUsernameError ? <div className={styles.error}>- {usernameError}</div> : null
            }
            <div className={styles.user_input}>
                <input placeholder='Password' name='password' type="password" minLength={6} maxLength={50} required/>
            </div>
            {
                isPasswordError ? <div className={styles.error}>- {passwordError}</div> : null
            }
            <div className={styles.user_input}>
                <input placeholder='Email (optional)' type="email" id="email" name="email" />
            </div>
            <div className={styles.user_input}>
                <input type="tel" name="phone" placeholder="111-111-1111 (optional)" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
            </div>
            <div className={styles.already}>Already have an account? <b onClick={changeToSignup}>Sign in</b></div>
            <button className={styles.create_account}>Sign up</button>
        </form>
    )
}
