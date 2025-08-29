
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./styles/Nav.css"
const VITE_API_URL = import.meta.env.VITE_API_URL
import "./styles/body.css"
import live from "./assets/live.png"
import feeling from "./assets/feeling.png"
import photos from "./assets/photos.png"
import CreatePost from "./CreatePost";
import CreateComment from "./CreateComment";
import { useState } from "react";
import { useEffect } from "react";
import { format, compareAsc } from "date-fns";
import { formatDistanceToNow } from "date-fns";



function Body(){

    const [NewPost,SetNewPost] = useState(false)
    const [OpenCommentPostId, setOpenCommentPostId] = useState(null);
    const [Posts,SetPosts]=useState(null)

     const [User,SetUser] = useState({
            icon:null,
            name:null,
            cover:null,
        })
    
    const MyID = localStorage.getItem("id")

    async function GetUser() {

        const response = await fetch (`${VITE_API_URL}/users/${MyID}`)

        const data = await response.json()


        SetUser(data.user)
        
    }

        async function GetPosts() {

        const response = await fetch (`${VITE_API_URL}/users/${MyID}/posts`)

        const data = await response.json()




        SetPosts(data.AllPosts)
        
    }


    async function LikePost(id) {

        const response = await fetch (`${VITE_API_URL}/posts/${id}/like`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({              
        MyID
    })
    })

        const data = await response.json()

        GetPosts()
        
    }

    
    const navigate = useNavigate();

    useEffect(()=>{
            
            GetUser()
            GetPosts()
        },[])
    

    
return (

    <>

        {NewPost &&  <CreatePost setOpen={SetNewPost} User={User} GetPosts={GetPosts} />}

        

        <div className="body">


            <div className="new_post">

                <div className="header_newpost">
                    <img src={User.icon}  />
                    <input type="text" name="" id="" onClick={()=>SetNewPost(true)} readOnly  placeholder="What's on your mind,Name?"/>
                </div>

                <hr />

                <div className="footer_new_post">
                    <div>
                        <img src={live} alt="" />
                        <p>Live video</p>
                    </div>

                    <div>

                        <img src={photos} alt="" />
                        <p>Photo/video</p>

                    </div>

                    <div>
                        <img src={feeling} alt="" />
                        <p>Feeling/activity</p>
                    </div>
                </div>

            </div>


            {Posts && <div className="posts">
                

                

                {Posts.map((post)=>{

                    let liked = post.likes.some(p=>p.LikerID==MyID)


                    return post.Poster ? (
                        <div className="post" key={post.id}>

                            {OpenCommentPostId ==post.id &&  <CreateComment setOpen={()=>setOpenCommentPostId(null)} User={User} post={post} liked={liked} LikePost={LikePost} Comments={post.comments} />}


                            <div className="header_post">


                                <div className="profile">

                                    <img id="icon_profile"  src={post.Poster.icon} alt="" />
                                
                                    <div className="right">
                                        <div> <span id="name">{post.Poster.name}</span> </div>

                                        <span id="date">{formatDistanceToNow(new Date(post.created_at), { addSuffix: true }).replace("about ", "")}</span>
                                    </div>
                                
                                </div>


                                <div className="edit_remove_icon">
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

                                    <svg id="remove_icon"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 20 20"
            width="20"
            height="20"
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

                            <div className="body">

                            <p>{post.text}</p>

                            </div>

                            <div className="footer_post">

                                <div className="footer_up">

                                    <div className="footer_left">
                                         <img id="like_icon"
                                            className="x16dsc37"
                                            height="18"
                                            width="18"
                                            role="presentation"
                                            src="data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint2_radial_15251_63610)' fill-opacity='.5'/%3E%3Cpath d='M7.3014 3.8662a.6974.6974 0 0 1 .6974-.6977c.6742 0 1.2207.5465 1.2207 1.2206v1.7464a.101.101 0 0 0 .101.101h1.7953c.992 0 1.7232.9273 1.4917 1.892l-.4572 1.9047a2.301 2.301 0 0 1-2.2374 1.764H6.9185a.5752.5752 0 0 1-.5752-.5752V7.7384c0-.4168.097-.8278.2834-1.2005l.2856-.5712a3.6878 3.6878 0 0 0 .3893-1.6509l-.0002-.4496ZM4.367 7a.767.767 0 0 0-.7669.767v3.2598a.767.767 0 0 0 .767.767h.767a.3835.3835 0 0 0 .3835-.3835V7.3835A.3835.3835 0 0 0 5.134 7h-.767Z' fill='%23fff'/%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(90 .0005 8) scale(7.99958)'%3E%3Cstop offset='.5618' stop-color='%230866FF' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230866FF' stop-opacity='.1'/%3E%3C/radialGradient%3E%3CradialGradient id='paint2_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(45 -4.5257 10.9237) scale(10.1818)'%3E%3Cstop offset='.3143' stop-color='%2302ADFC'/%3E%3Cstop offset='1' stop-color='%2302ADFC' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.3989' y1='2.3999' x2='13.5983' y2='13.5993' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2302ADFC'/%3E%3Cstop offset='.5' stop-color='%230866FF'/%3E%3Cstop offset='1' stop-color='%232B7EFF'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E"
                                            />
                                            <span>{post.likes?.length ?? 0} </span> 
                                    </div>

                                    <div className="footer_right">

                                        <div onClick={()=>{setOpenCommentPostId(post.id)}}>
                                            <span>{post.comments?.length}</span>
                            

                                            <svg style={{alignSelf:"center",cursor:"pointer"}} id="comment_icon_fill" height="16" width="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#A9ABB0"><path d="M16 2C8.27 2 2 8.27 2 16c0 4.42 2.35 8.35 6 10.92V30l7.01-4.25c.97.16 1.97.25 2.99.25 7.73 0 14-6.27 14-14S23.73 2 16 2z"/></svg>
                                        </div>

                                        

                                    </div>

                                </div>
                                <hr />
                                <div className="footer_down">
                                    
                                    
                                    <div onClick={()=>{LikePost(post.id)
                                        liked = !liked}}>

                                        <svg id="like"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="30"
                                            height="30"
                                            fill={liked ? "#1A74FF" : "#9ca0a7ff"}
                                            viewBox="0 0 14 14"
                                            >
                                            <path d="M7.3014 3.8662a.6974.6974 0 0 1 .6974-.6977c.6742 0 1.2207.5465 1.2207 1.2206v1.7464h1.7953c.992 0 1.7232.9273 1.4917 1.892l-.4572 1.9047a2.301 2.301 0 0 1-2.2374 1.764H6.9185a.5752.5752 0 0 1-.5752-.5752V7.7384c0-.4168.097-.8278.2834-1.2005l.2856-.5712a3.6878 3.6878 0 0 0 .3893-1.6509l-.0002-.4496ZM4.367 7a.767.767 0 0 0-.7669.767v3.2598a.767.767 0 0 0 .767.767h.767a.3835.3835 0 0 0 .3835-.3835V7.3835A.3835.3835 0 0 0 5.134 7h-.767Z" />
                                        </svg>
                                    <span style={{color:liked ? "#1A74FF" : "#9ca0a7ff"}}>Like</span>
                                    </div>
                            

                                    <div onClick={()=>{setOpenCommentPostId(post.id)}}>                                        
                                        <svg id="comment_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="#65676B"><path d="M16,26c-1.168,0-2.296-.136-3.38-.367L7.912,28.463l.063-4.639C4.366,21.654,2,18.066,2,14C2,7.373,8.268,2,16,2s14,5.373,14,12s-6.268,12-14,12ZM16,0C7.164,0,0,6.269,0,14c0,4.419,2.345,8.354,6,10.919V32l7.009-4.253c.97.16,1.968.253,2.991.253c8.836,0,16-6.268,16-14S24.836,0,16,0Z"/></svg>
                                        <span>Comment</span>
                                    </div>

                                    <div>
                                        <svg id="share_icon" width="28" height="28" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.47 4.13998C12.74 4.35998 12.28 5.96 12.09 7.91C6.77997 7.91 2 13.4802 2 20.0802C4.19 14.0802 8.99995 12.45 12.14 12.45C12.34 14.21 12.79 15.6202 13.47 15.8202C15.57 16.4302 22 12.4401 22 9.98006C22 7.52006 15.57 3.52998 13.47 4.13998Z" stroke="#65676B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                        <span>Share</span>
                                    </div>

                                    
                                </div>


                            </div>

                        </div>
                    ) : null
               
               
            })}

            </div>}

        </div>

    </>
    
);
}

export default Body