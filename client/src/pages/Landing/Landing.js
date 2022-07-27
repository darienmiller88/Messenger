import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { userApi } from "../../components/api/api"
import FormWrapper from '../../components/RegistrationForms/FormWrapper'
import styles from "./Landing.module.scss"

export default function Landing() {
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try {
                await userApi.get("/checkauth")
                navigate("/")
            } catch (error) {
                console.log("err:", error);
            }
        })()
    }, [])
    
    return (
        <div className={styles.landing}>
            <FormWrapper />
        </div>
    )
}
