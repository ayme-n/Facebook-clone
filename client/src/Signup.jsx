import { data, Link } from "react-router-dom"
import logo from "./assets/facebook.svg"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const VITE_API_URL = import.meta.env.VITE_API_URL
import { Navigate } from "react-router-dom";
import "./styles/Signup.css"

function Signup(){

    const [username,SetUsername] = useState("")
    const [email,SetEmail] = useState("")
    const [password,SetPassword] = useState("")
    const [gender,SetGender] = useState("")
    const [day,SetDay] = useState("")
    const [month,SetMonth] = useState("")
    const [year,SetYear] = useState("")
    const [errors,SetErrors] = useState("\u00A0")
    const token = localStorage.getItem("token")
    const navigate = useNavigate();


    async function handleSubmit(e){

    e.preventDefault();


    const birthday = new Date(year,parseInt(month,10),day)


    const response = await fetch(`${VITE_API_URL}/signup`,{
        method : "POST",
        headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({              
        username,email,password,gender,birthday,name:username
    })
    })

    const data = await response.json()

    //console.log(data.NewUser)

    if(response.ok){
        navigate("/login")
    }
    else{
        SetErrors(data.error)
    }
   

    }

    if(token){
        return <Navigate to="/"/>  
    }
    
    return(
        <div className="signup_container">

            <img src={logo} alt="" />
            
            <div className="form_container">
                
                <div className="form_header">
                    <h2>Create a new account</h2>
                    <p>It’s quick and easy.</p>
                </div>

                <hr />
                <div className="form">
                    <form onSubmit={handleSubmit}>

                
                <input type="text" name="username" placeholder="Username" onChange={(e)=>{SetUsername(e.target.value)}} required/>


                <div className="birthday">
                    
                    <select name="month" id="month" onChange={(e)=>{SetMonth(e.target.value)}}  >
                    
                    <option value="1">Jan</option>
                    <option value="2">Feb</option>
                    <option value="3">Mar</option>
                    <option value="4">Apr</option>
                    <option value="5">May</option>
                    <option value="6">Jun</option>
                    <option value="7">Jul</option>
                    <option value="8">Aug</option>
                    <option value="9">Sep</option>
                    <option value="10">Oct</option>
                    <option value="11">Nov</option>
                    <option value="12">Dec</option>
                    </select>

                    <select name="day" id="day" onChange={(e)=>{SetDay(e.target.value)}} >
                        
                        
                        {Array.from({ length: 31 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                        ))}
                        

                    </select>

                    <select name="year" id="year" onChange={(e)=>{SetYear(e.target.value)}} >
                        
                        
                        {Array.from({ length: 101 }, (_, i) => (
                        <option key={2025    - i} value={2025 - i}>
                            {2025 - i}
                        </option>
                        ))}
                        

                    </select>

                </div>

                <div className="gender">
                   <div id="Female">
                        <div>
                            Female
                        </div>
                        <input type="radio" name="gender" value="Female"  onChange={(e)=>{SetGender(e.target.value)}} required/>
                   </div>

                    <div id="Male">
                        <div>
                            Male
                        </div>
                        <input type="radio" name="gender"  value="Male"  onChange={(e)=>{SetGender(e.target.value)}}/> <br />
                    </div>
                </div>

                <input type="email" name="email" placeholder="Email" onChange={(e)=>{SetEmail(e.target.value)}} required/>

                <input type="password" name="password"  placeholder="Password" onChange={(e)=>{SetPassword(e.target.value)}} required/>

                <div className="error">
                    <span>{errors}</span>
                </div>

                <div className="signup">
                    <input type="submit" value="Sign Up" /><br />

                    <Link to="/login">Already have an account?</Link>
                </div>
                    
                
                </form>


                </div>
            </div>

        </div>
    )
}

export default Signup