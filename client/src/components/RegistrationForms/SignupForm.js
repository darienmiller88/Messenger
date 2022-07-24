import React, { useRef } from 'react'
import logo from "../../img/logo.png"
import styles from "./Form.module.scss"
import { userApi } from '../../api/api'

export default function SignupForm({ changeToSignup }) {
    const formRef = useRef(null)

    const submitForm = (e) => {
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

        console.log("data:", data);

        formRef.current.reset()
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
                <input placeholder='Username' name='username' required/>
            </div>
            <div className={styles.user_input}>
                <input placeholder='Password' name='password' type="password" required/>
            </div>
            <div className={styles.user_input}>
                <input placeholder='Email (optional)' name='email' required/>
            </div>
            <div className={styles.user_input}>
                <input type="tel" name="phone" placeholder="111-111-1111 (optional)" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"  />
            </div>
            <div className={styles.already}>Already have an account? <b onClick={changeToSignup}>Sign in</b></div>
            <button className={styles.create_account}>Sign up</button>
        </form>
    )
}
