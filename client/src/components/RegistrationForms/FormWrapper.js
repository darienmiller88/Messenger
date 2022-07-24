import React, { useState } from 'react'
import SigninForm from './SigninForm'
import SignupForm from './SignupForm'

export default function FormWrapper() {
    const [isSignIn, setIsSignIn] = useState(true)

    return (
        isSignIn
        ?
        <SigninForm changeToSignup={() => setIsSignIn(!isSignIn)}/>
        :
        <SignupForm changeToSignup={() => setIsSignIn(!isSignIn)}/>
    )
}
