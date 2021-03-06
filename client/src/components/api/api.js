import axios from "axios"

const userApiURL = window.location.hostname === "localhost" 
? 
"http://localhost:8080/api/v1/users" 
:
"https://facebookmessengerapi.herokuapp.com/api/v1/users"

export const userApi = axios.create({
    baseURL: userApiURL,
    withCredentials: true,
});
