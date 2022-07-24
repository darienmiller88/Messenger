import React from 'react'
import FormWrapper from '../../components/RegistrationForms/FormWrapper'
import styles from "./Landing.module.scss"

export default function Landing() {
    return (
        <div className={styles.landing}>
            <FormWrapper />
        </div>
    )
}
