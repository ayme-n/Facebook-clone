import { data, Link } from "react-router-dom"
import logo from "./assets/facebook.svg"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
const VITE_API_URL = import.meta.env.VITE_API_URL
import "./styles/Login.css"

function Login(){

    const [email,SetEmail] = useState("Alex@example.com")
    const [errors,SetErrors] = useState("")
    const [password,SetPassword] = useState("123456")
    const token = localStorage.getItem("token")
    
    const navigate = useNavigate();


    async function handleSubmit(e){

    e.preventDefault();


    const response = await fetch(`${VITE_API_URL}/login`,{
        method : "POST",
        headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({              
        email,password
    })
    })

    const data = await response.json()

    if(data.token != undefined) {
        localStorage.setItem("token",data.token)
        localStorage.setItem("id",data.id)
    }

    if(response.ok){
        navigate("/")
    }
    else{
        SetErrors(data.error)
    }

    }

    if(token){
        return <Navigate to="/"/>
       
    }
    
     return (
        <div className="auth_container">
            <img src={logo} alt="Facebook" id="login_logo" />

            <div className="auth_form_container login_form">
                <div className="form_header_login">
                    <h2>Log into Facebook</h2>
                </div>

              

                <form id="login_form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => SetEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => SetPassword(e.target.value)}
                        required
                    />

                    <div className="error">
                        <span>{errors}</span>
                    </div>

                    <div className="auth_actions">
                        <input type="submit" value="Log in" id="button" />
                        <Link to="/signup">Create new account</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login