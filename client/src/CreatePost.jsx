
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
const VITE_API_URL = import.meta.env.VITE_API_URL
import "./styles/createpost.css"
import { useState } from "react";


function CreatePost({open,setOpen,User,GetPosts}){

    
    const [PostText,SetPostText]=useState("")
    
    const MyID = localStorage.getItem("id")


    async function SubmitPost() {
        

        const response = await fetch(`${VITE_API_URL}/users/${MyID}/post`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({              
                    text : PostText,
                    PosterID : MyID,

                })
            })

        const data = await response.json()

        console.log(data.post)

        SetPostText("")

        GetPosts()
    }

    
    const navigate = useNavigate();

    
return  (

    
    <>
        <div className="overlay"></div>

        <div className="create_post_container">

            

            <div className="create_post_header">
                <h3>Create Post</h3>

                <div className="remove_icon_container" onClick={()=>setOpen(false)}>
                    <svg id="remove_icon"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 20 23"
        width="15"
        height="15"
        fill="currentColor"
        aria-hidden="true"
        className="x14rh7hd x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq"
        style={{ "--x-color": "var(--secondary-icon)" }}
        >
        <path
            d="M15.543 3.043a1 1 0 1 1 1.414 1.414L11.414 10l5.543 5.542a1 1 0 0 1-1.414 1.415L10 11.414l-5.543 5.543a1 1 0 0 1-1.414-1.415L8.586 10 3.043 4.457a1 1 0 1 1 1.414-1.414L10 8.586l5.543-5.543z"
            fill="#B0B3B8"
        />
                    </svg>
                </div>
            </div>
            <hr />
            <div className="create_post_profile">
                <img id="icon_profile" src={User.icon} alt="" />
                <span>{User.name}</span>
            </div>

            <div>
                <textarea name="" id="post_input" placeholder={`What's on your mind,${User.name}?`} value={PostText} onChange={(e)=>{SetPostText(e.target.value)}}></textarea>
            </div>

            <input type="submit" name="" id="" value="Post"   onClick={()=>{setOpen(false);SubmitPost()}} />

        </div>

    </> 
    
) ;
}

export default CreatePost