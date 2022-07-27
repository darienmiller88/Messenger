import React, { useState, useEffect } from 'react'
import { userApi } from "../../components/api/api"
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [username, setUsername] = useState("")
    const navigate = useNavigate(null)

    useEffect(() => {
        (async () => {
            try {  
                setUsername(localStorage.getItem("username"))
                const response = await userApi.get(`/${localStorage.getItem("username")}`)
                console.log("res:", response);
            } catch (error) {
                console.log("err:", error);
                if (error.response.status === 403){
                    navigate("/")
                }
            }
        })()
    }, [])
    
    const signout = () => {
        userApi.post("/signout")
        localStorage.clear()
        navigate("/")
    }

    return (
        <div>
            Welcome {username}!
            <br />
            <button onClick={signout}>Sign out</button>
        </div>
    )
}
