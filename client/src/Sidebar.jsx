
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./styles/sidebar.css"
const VITE_API_URL = import.meta.env.VITE_API_URL
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


function Sidebar(){
    

    const [Friends,setfriends]=useState([])
    const MyID = localStorage.getItem("id")

    
    const navigate = useNavigate();


        async function SetFriends() {

        const response = await fetch(`${VITE_API_URL}/users/${MyID}/friends`)

        const data = await response.json()

        const friends = data.Friends
    
        setfriends(friends)
        
    }

     useEffect(()=>{
       
            SetFriends()
    
    },[])
    
return (

    <div className="sidebar">

        <p className="title">Sponsored</p>

        <hr />

        <div className="contacts">

            <div className="contact_header">
                <p>Contacts</p>

                <div>
                    <svg id="search_contact_icon"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 16 16"
    width="16"
    height="16"
    fill="currentColor"
    className="x14rh7hd x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq"
    style={{ "--x-color": "var(--secondary-icon)" }}
    >
    <g fillRule="evenodd" transform="translate(-448 -544)" fill="#B0B3B8">
        <g fillRule="nonzero" fill="#B0B3B8">
        <path
            d="M10.743 2.257a6 6 0 1 1-8.485 8.486 6 6 0 0 1 8.485-8.486zm-1.06 1.06a4.5 4.5 0 1 0-6.365 6.364 4.5 4.5 0 0 0 6.364-6.363z"
            transform="translate(448 544)"
            fill="#B0B3B8"
        />
        <path
            d="M10.39 8.75a2.94 2.94 0 0 0-.199.432c-.155.417-.23.849-.172 1.284.055.415.232.794.54 1.103a.75.75 0 0 0 1.112-1.004l-.051-.057a.39.39 0 0 1-.114-.24c-.021-.155.014-.356.09-.563.031-.081.06-.145.08-.182l.012-.022a.75.75 0 1 0-1.299-.752z"
            transform="translate(448 544)"
            fill="#B0B3B8"
        />
        <path
            d="M9.557 11.659c.038-.018.09-.04.15-.064.207-.077.408-.112.562-.092.08.01.143.034.198.077l.041.036a.75.75 0 0 0 1.06-1.06 1.881 1.881 0 0 0-1.103-.54c-.435-.058-.867.018-1.284.175-.189.07-.336.143-.433.2a.75.75 0 0 0 .624 1.356l.066-.027.12-.061z"
            transform="translate(448 544)"
            fill="#B0B3B8"
        />
        <path
            d="m13.463 15.142-.04-.044-3.574-4.192c-.599-.703.355-1.656 1.058-1.057l4.191 3.574.044.04c.058.059.122.137.182.24.249.425.249.96-.154 1.41l-.057.057c-.45.403-.986.403-1.411.154a1.182 1.182 0 0 1-.24-.182zm.617-.616.444-.444a.31.31 0 0 0-.063-.052c-.093-.055-.263-.055-.35.024l.208.232.207-.206.006.007-.22.257-.026-.024.033-.034.025.027-.257.22-.007-.007zm-.027-.415c-.078.088-.078.257-.023.35a.31.31 0 0 0 .051.063l.205-.204-.233-.209z"
            transform="translate(448 544)"
            fill="#B0B3B8"
        />
        </g>
    </g>
                    </svg>
                </div>

                

                <div>
                    <svg id="options_icon_contact"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 20 20"
            width="20"
            height="20"
            fill="currentColor"
            className="x14rh7hd x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq"
            style={{ "--x-color": "var(--secondary-icon)" }}
            >
            <g fillRule="evenodd" transform="translate(-446 -350)" fill="#B0B3B8">
                <path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0" />
            </g>
                    </svg>
                    
                </div>
            </div>


            <div className="contact_body">

               

                <ul>
                    {Friends.map((friend)=>{
                        return (
                             <div key={friend.id}>
                                <img id="nav_icon_profile" src={friend.icon} alt="pfp" />
                                <p>{friend.name}</p>
                            </div>
                        )
                    })}
                </ul>

            </div>



        </div>

        <hr />

        <div className="groups">

            <p>Group chats</p>

            <div className="group_chat">

                <div className="plus_group_container">

                <svg id="add_icon_contact"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 20 20"
    width="20"
    height="20"
    fill="currentColor"
    className="x14rh7hd x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq"
    >
    <g fillRule="evenodd" transform="translate(-446 -350)" fill="#FFFFFF">
        <g fillRule="nonzero" fill="#FFFFFF">
        <path
            d="M95 201.5h13a1 1 0 1 0 0-2H95a1 1 0 1 0 0 2z"
            transform="translate(354.5 159.5)"
            fill="#FFFFFF"
        />
        <path
            d="M102.5 207v-13a1 1 0 1 0-2 0v13a1 1 0 1 0 2 0z"
            transform="translate(354.5 159.5)"
            fill="#FFFFFF"
        />
        </g>
    </g>
                </svg>
                
                </div>
            
                <p>Create group chat</p>

            </div>

        </div>

        <div className="new_msg">
           <i id="new_msg_icon"
  data-visualcompletion="css-img"
  className="x1b0d499 xep6ejk"
  style={{
    width: "20px",
    height: "20px",
    backgroundColor: "#E8E9ED", // 👈 custom color
    WebkitMaskImage:
      "url('https://static.xx.fbcdn.net/rsrc.php/v4/ys/r/C20lm7rAME6.png?_nc_eui2=AeGQWNfBEoaWz9_T9WWGZIvsYkJfggXwAR9iQl-CBfABH5JYj1dVAUOk0GknRz4X19NqsZ3kpZ80SJK9Le0THEuX')",
    WebkitMaskPosition: "0px -401px",
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskSize: "auto",
    maskImage:
      "url('https://static.xx.fbcdn.net/rsrc.php/v4/ys/r/C20lm7rAME6.png?_nc_eui2=AeGQWNfBEoaWz9_T9WWGZIvsYkJfggXwAR9iQl-CBfABH5JYj1dVAUOk0GknRz4X19NqsZ3kpZ80SJK9Le0THEuX')",
    maskPosition: "0px -401px",
    maskRepeat: "no-repeat",
    maskSize: "auto",
    display: "inline-block",
  }}
            ></i>
        </div>

    </div>
    
);
}

export default Sidebar