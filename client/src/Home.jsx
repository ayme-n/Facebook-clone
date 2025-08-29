import { useState } from "react";
const VITE_API_URL = import.meta.env.VITE_API_URL
import { Navigate } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import Body from "./Body";
import "./styles/home.css"

function Home(){

    const token = localStorage.getItem("token")

    

    if(!token) return <Navigate to="/login"/>

    return(
        <div>
            
            <Header></Header>

            <div className="container">

                <Nav></Nav>

                <Body></Body>

                <Sidebar></Sidebar>
                

            </div>
                
    

            
            

        </div>
    )
}

export default Home