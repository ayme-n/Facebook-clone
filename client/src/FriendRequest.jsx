
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./styles/FriendRequest.css"
import { useEffect, useState } from "react";


const VITE_API_URL = import.meta.env.VITE_API_URL
function FriendRequest({icon,name,id,SetRrequests,Sender}){

   
    const token = localStorage.getItem("token")
    const MyID = localStorage.getItem("id")
    let firsttime = true


            async function RemoveRequest(id) {

        const response = await fetch(`${VITE_API_URL}/requests/${id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })

    SetRrequests()
        
    }

    async function AcceptRequest(id) {

        RemoveRequest(id)

        const response = await fetch(`${VITE_API_URL}/users/${MyID}/friend`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({              
       FriendID:Sender
    })
    })

    const data = await response.json()

    SetRrequests()
        
    }

    

    useEffect(()=>{

        if(firsttime){

            
           
            
            firsttime= false

        }

    },[])


    return(
    <>
            <div className="friend_request">

                <img className="icon_profile" src={icon} alt="" />

                <div className="friend_request_profile">
                    <h3>{name}</h3>
                

                <div className="friend_request_buttons">
                    <button className="confirm_button" onClick={() => AcceptRequest(id)} >Confirm</button>

                    <button className="delete_button" onClick={() => RemoveRequest(id)} >Delete</button>
                </div>
                </div>
                </div>
                
            
    </>
    )

}

export default FriendRequest