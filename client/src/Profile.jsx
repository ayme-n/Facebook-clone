
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./styles/Nav.css"
const VITE_API_URL = import.meta.env.VITE_API_URL
import "./styles/body.css"
import live from "./assets/live.png"
import { format, compareAsc } from "date-fns";
import feeling from "./assets/feeling.png"
import photos from "./assets/photos.png"
import "./styles/profile.css"
import CreatePost from "./CreatePost";
import { useState } from "react";
import Header from "./Header";
import CreateComment from "./CreateComment";
import { useEffect } from "react";
import { formatDistance, subDays } from "date-fns";
import { formatDistanceToNow } from "date-fns";


function Profile(){

    const [NewPost,SetNewPost] = useState(false)
    const [OpenCommentPostId, setOpenCommentPostId] = useState(null);
    const [Friends,setfriends]=useState(null)
    const [Posts,SetPosts]=useState(null)
    const [User,SetUser] = useState({
        icon:null,
        name:null,
        cover:null,
    })
    const MyID = localStorage.getItem("id")

    
    const navigate = useNavigate();

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

    async function GetUser() {

        const response = await fetch (`${VITE_API_URL}/users/${MyID}`)

        const data = await response.json()



        SetUser(data.user)
        
        
    }

    async function SubmitCover(e) {

        const file = e.target.files[0]

        const formData = new FormData();

        formData.append("cover", file);
        

        const response = await fetch(`${VITE_API_URL}/users/${MyID}/cover`,{
        method: "PUT",
        body: formData
        
        })

        const data = await response.json()

        console.log(data.url)

        GetUser()
    }

    async function SubmitImage(e) {

        const file = e.target.files[0]

        const formData = new FormData();

        formData.append("image", file);
        

        const response = await fetch(`${VITE_API_URL}/users/${MyID}/image`,{
        method: "PUT",
        body: formData
        
        })

        const data = await response.json()

        console.log(data.url)

        GetUser()
    }

     async function GetPosts() {

        const response = await fetch (`${VITE_API_URL}/users/${MyID}/posts`)

        const data = await response.json()





        SetPosts(data.AllPosts)
        
    }




    
        async function SetFriends() {

        const response = await fetch(`${VITE_API_URL}/users/${MyID}/friends`)

        const data = await response.json()

        const friends = data.Friends
    
        setfriends(friends)
        
    }

    useEffect(()=>{
        GetUser()
        SetFriends()
        GetPosts()
    },[])

    
return (

    <>

        <Header></Header>

        {NewPost &&  <CreatePost setOpen={SetNewPost}  User={User} GetPosts={GetPosts}/>}

        <div className="Profile">

            <div className="profile_header_container">

                <div className="cover_icon" style={{backgroundImage:`url(${User.cover})`,backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center"}}> <button className="edit_cover_button">
                    <svg width="23"  height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M9.77778 21H14.2222C17.3433 21 18.9038 21 20.0248 20.2646C20.51 19.9462 20.9267 19.5371 21.251 19.0607C22 17.9601 22 16.4279 22 13.3636C22 10.2994 22 8.76721 21.251 7.6666C20.9267 7.19014 20.51 6.78104 20.0248 6.46268C19.3044 5.99013 18.4027 5.82123 17.022 5.76086C16.3631 5.76086 15.7959 5.27068 15.6667 4.63636C15.4728 3.68489 14.6219 3 13.6337 3H10.3663C9.37805 3 8.52715 3.68489 8.33333 4.63636C8.20412 5.27068 7.63685 5.76086 6.978 5.76086C5.59733 5.82123 4.69555 5.99013 3.97524 6.46268C3.48995 6.78104 3.07328 7.19014 2.74902 7.6666C2 8.76721 2 10.2994 2 13.3636C2 16.4279 2 17.9601 2.74902 19.0607C3.07328 19.5371 3.48995 19.9462 3.97524 20.2646C5.09624 21 6.65675 21 9.77778 21ZM12 9.27273C9.69881 9.27273 7.83333 11.1043 7.83333 13.3636C7.83333 15.623 9.69881 17.4545 12 17.4545C14.3012 17.4545 16.1667 15.623 16.1667 13.3636C16.1667 11.1043 14.3012 9.27273 12 9.27273ZM12 10.9091C10.6193 10.9091 9.5 12.008 9.5 13.3636C9.5 14.7192 10.6193 15.8182 12 15.8182C13.3807 15.8182 14.5 14.7192 14.5 13.3636C14.5 12.008 13.3807 10.9091 12 10.9091ZM16.7222 10.0909C16.7222 9.63904 17.0953 9.27273 17.5556 9.27273H18.6667C19.1269 9.27273 19.5 9.63904 19.5 10.0909C19.5 10.5428 19.1269 10.9091 18.6667 10.9091H17.5556C17.0953 10.9091 16.7222 10.5428 16.7222 10.0909Z" fill="#181E1E"></path> </g></svg>
                
                <span>Edit cover Photo</span>
                <label htmlFor="cover"></label>
                </button>

               

                <input type="file" name="cover" id="cover" style={{display:"none"}} onChange={SubmitCover} />
                
                </div>

                <div className="profile_header">

                <div className="profile_icon_container">
                     <label htmlFor="image" id="label_icon"></label>
                    <img src={User.icon}  id="profile_icon" />
                    
                        <div className="camera_container">
                                                
                            <svg id="camera" width="23"  height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M9.77778 21H14.2222C17.3433 21 18.9038 21 20.0248 20.2646C20.51 19.9462 20.9267 19.5371 21.251 19.0607C22 17.9601 22 16.4279 22 13.3636C22 10.2994 22 8.76721 21.251 7.6666C20.9267 7.19014 20.51 6.78104 20.0248 6.46268C19.3044 5.99013 18.4027 5.82123 17.022 5.76086C16.3631 5.76086 15.7959 5.27068 15.6667 4.63636C15.4728 3.68489 14.6219 3 13.6337 3H10.3663C9.37805 3 8.52715 3.68489 8.33333 4.63636C8.20412 5.27068 7.63685 5.76086 6.978 5.76086C5.59733 5.82123 4.69555 5.99013 3.97524 6.46268C3.48995 6.78104 3.07328 7.19014 2.74902 7.6666C2 8.76721 2 10.2994 2 13.3636C2 16.4279 2 17.9601 2.74902 19.0607C3.07328 19.5371 3.48995 19.9462 3.97524 20.2646C5.09624 21 6.65675 21 9.77778 21ZM12 9.27273C9.69881 9.27273 7.83333 11.1043 7.83333 13.3636C7.83333 15.623 9.69881 17.4545 12 17.4545C14.3012 17.4545 16.1667 15.623 16.1667 13.3636C16.1667 11.1043 14.3012 9.27273 12 9.27273ZM12 10.9091C10.6193 10.9091 9.5 12.008 9.5 13.3636C9.5 14.7192 10.6193 15.8182 12 15.8182C13.3807 15.8182 14.5 14.7192 14.5 13.3636C14.5 12.008 13.3807 10.9091 12 10.9091ZM16.7222 10.0909C16.7222 9.63904 17.0953 9.27273 17.5556 9.27273H18.6667C19.1269 9.27273 19.5 9.63904 19.5 10.0909C19.5 10.5428 19.1269 10.9091 18.6667 10.9091H17.5556C17.0953 10.9091 16.7222 10.5428 16.7222 10.0909Z" fill="#e4e7e7ff"></path> </g></svg>
                            <label htmlFor="image" id="label_icon"></label>
                            <input type="file" onChange={SubmitImage} id="image" name="image" style={{display : "none"}} />
                        </div>
                </div>

                

                <div className="profile_name">
                    <h1>{User.name}</h1>
                    {Friends && <p>{Friends.length} friends</p>}
                    
                </div>

                <div className="add_edit_button">

                    <button className="add_button"><svg id="add_icon_contact"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 20 20"
        width="15"
        height="15"
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
                    </svg> <span>Add to story</span></button>

                    <button className="edit_button"><svg xmlns="http://www.w3.org/2000/svg" x="0px" fill="#E8E9ED" y="0px" width="15" height="15" viewBox="0 0 48 48">
    <path d="M 36 5.0097656 C 34.205301 5.0097656 32.410791 5.6901377 31.050781 7.0507812 L 8.9160156 29.183594 C 8.4960384 29.603571 8.1884588 30.12585 8.0253906 30.699219 L 5.0585938 41.087891 A 1.50015 1.50015 0 0 0 6.9121094 42.941406 L 17.302734 39.974609 A 1.50015 1.50015 0 0 0 17.304688 39.972656 C 17.874212 39.808939 18.39521 39.50518 18.816406 39.083984 L 40.949219 16.949219 C 43.670344 14.228094 43.670344 9.7719064 40.949219 7.0507812 C 39.589209 5.6901377 37.794699 5.0097656 36 5.0097656 z M 36 7.9921875 C 37.020801 7.9921875 38.040182 8.3855186 38.826172 9.171875 A 1.50015 1.50015 0 0 0 38.828125 9.171875 C 40.403 10.74675 40.403 13.25325 38.828125 14.828125 L 36.888672 16.767578 L 31.232422 11.111328 L 33.171875 9.171875 C 33.957865 8.3855186 34.979199 7.9921875 36 7.9921875 z M 29.111328 13.232422 L 34.767578 18.888672 L 16.693359 36.962891 C 16.634729 37.021121 16.560472 37.065723 16.476562 37.089844 L 8.6835938 39.316406 L 10.910156 31.521484 A 1.50015 1.50015 0 0 0 10.910156 31.519531 C 10.933086 31.438901 10.975086 31.366709 11.037109 31.304688 L 29.111328 13.232422 z"></path>
                    </svg>Edit profile</button>

                </div>

            

                </div>



                <div className="profile_footer">

                        <ul>
                            <li><div>Posts</div></li>
                            <li><div>About</div></li>
                            <li><div>Friends</div></li>
                            <li><div>Photos</div></li>
                            <li><div>Videos</div></li>
                            <li><div>Reels</div></li>
                            <li><div>More</div></li>
                            
                        </ul>

                        <div className="option_icon"><svg id="options_icon_contact"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 20 20"
                    width="15"
                    height="15"
                    fill="currentColor"
                    className="x14rh7hd x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq"
                    style={{ "--x-color": "var(--secondary-icon)" }}
                    >
                    <g fillRule="evenodd" transform="translate(-446 -350)" fill="#B0B3B8">
                        <path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0" />
                    </g>
                        </svg></div>

                </div>
            </div>

            <div className="profile_container">

                <div className="profile_sidebar">
                    <div className="profile_intro">

                        <h3>Intro</h3>

                        <div>
                            <p>Add bio</p>
                        </div>

                        <div>
                            <p>Edit details</p>
                        </div>

                        <div>
                            <p>Add featured</p>
                        </div>

                    </div>

                    <div className="profile_photos">

                        <h3>Photos</h3>

                        <span>See all photos</span>

                        


                    </div>

                    <div className="profile_intro_friends">

                        <div>
                            <h3>Friends</h3>

                            <span>See all Friends</span>
                        </div>

                        {Friends && <p>{Friends.length} friends</p>}

                        

                        {Friends && 
                            <ul className="friends_list_profile">
                                {Friends.map((friend)=>{
                                    return(
                                        <div key={friend.id} >
                                            <img src={friend.icon} alt="" />
                                            <p>{friend.name}</p>
                                        </div>
                                    )
                                })}
                            </ul>
                        }

                    </div>
                </div>

                <div className="profile_container_right">

                    <div className="new_post">

                        <div className="header_newpost">
                            <img src={User.icon} alt="" />
                            <input type="text" name="" id="" onClick={()=>SetNewPost(true)} readOnly   placeholder="What's on your mind,Name?"/>
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


                    {Posts && User &&

                        

                        <div className="posts">

                        

                        {Posts.map((post)=>{

                            let liked = post.likes.some(p=>p.LikerID==MyID)

                            return post.PosterID == MyID ? (

                                <div className="post" key={post.id}>

                                {OpenCommentPostId==post.id &&  <CreateComment setOpen={()=>setOpenCommentPostId(null)} User={User} post={post} liked={liked} LikePost={LikePost} Comments={post.comments} />}


                                <div className="header_post">


                                    <div className="profile">

                                        <img id="icon_profile"  src={User.icon} />

                                        
                                

                                    
                                        <div className="right">
                                            <div> <span id="name">{User.name}</span>  </div>
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
                                            <img
                                            className="x16dsc37"
                                            height="18"
                                            width="18"
                                            role="presentation"
                                            src="data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint2_radial_15251_63610)' fill-opacity='.5'/%3E%3Cpath d='M7.3014 3.8662a.6974.6974 0 0 1 .6974-.6977c.6742 0 1.2207.5465 1.2207 1.2206v1.7464a.101.101 0 0 0 .101.101h1.7953c.992 0 1.7232.9273 1.4917 1.892l-.4572 1.9047a2.301 2.301 0 0 1-2.2374 1.764H6.9185a.5752.5752 0 0 1-.5752-.5752V7.7384c0-.4168.097-.8278.2834-1.2005l.2856-.5712a3.6878 3.6878 0 0 0 .3893-1.6509l-.0002-.4496ZM4.367 7a.767.767 0 0 0-.7669.767v3.2598a.767.767 0 0 0 .767.767h.767a.3835.3835 0 0 0 .3835-.3835V7.3835A.3835.3835 0 0 0 5.134 7h-.767Z' fill='%23fff'/%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(90 .0005 8) scale(7.99958)'%3E%3Cstop offset='.5618' stop-color='%230866FF' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230866FF' stop-opacity='.1'/%3E%3C/radialGradient%3E%3CradialGradient id='paint2_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(45 -4.5257 10.9237) scale(10.1818)'%3E%3Cstop offset='.3143' stop-color='%2302ADFC'/%3E%3Cstop offset='1' stop-color='%2302ADFC' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.3989' y1='2.3999' x2='13.5983' y2='13.5993' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2302ADFC'/%3E%3Cstop offset='.5' stop-color='%230866FF'/%3E%3Cstop offset='1' stop-color='%232B7EFF'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E"
                                            />
                                            <p>{post.likes?.length ?? 0} </p>                                       
                                        </div>

                                        <div className="footer_right">

                                            <div onClick={()=>{setOpenCommentPostId(post.id)}}>
                                                <span>{post.comments.length}</span>
                                                <svg style={{alignSelf:"center",cursor:"pointer"}} id="comment_icon_fill" height="16" width="16" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>comment 1</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-102.000000, -257.000000)" fill="#A9ABB0"> <path d="M118,257 C109.164,257 102,263.269 102,271 C102,275.419 104.345,279.354 108,281.919 L108,289 L115.009,284.747 C115.979,284.907 116.977,285 118,285 C126.836,285 134,278.732 134,271 C134,263.269 126.836,257 118,257" id="comment-1" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>

                                            </div>

                                         

                                        </div>

                                    </div>
                                    <hr />
                                    <div className="footer_down">
                                        
                                        
                                        <div onClick={()=>{LikePost(post.id)
                                        liked = !liked
                                    
                                }
                                        } >
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
                                            <svg id="comment_icon" width= "20px" height="20px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-100.000000, -255.000000)" fill="#65676B"> <path d="M116,281 C114.832,281 113.704,280.864 112.62,280.633 L107.912,283.463 L107.975,278.824 C104.366,276.654 102,273.066 102,269 C102,262.373 108.268,257 116,257 C123.732,257 130,262.373 130,269 C130,275.628 123.732,281 116,281 L116,281 Z M116,255 C107.164,255 100,261.269 100,269 C100,273.419 102.345,277.354 106,279.919 L106,287 L113.009,282.747 C113.979,282.907 114.977,283 116,283 C124.836,283 132,276.732 132,269 C132,261.269 124.836,255 116,255 L116,255 Z"  sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>

                                            <span>Comment</span>
                                        </div>

                                        <div>
                                            <svg  id="share_icon"  width="28px" height="28px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13.47 4.13998C12.74 4.35998 12.28 5.96 12.09 7.91C6.77997 7.91 2 13.4802 2 20.0802C4.19 14.0802 8.99995 12.45 12.14 12.45C12.34 14.21 12.79 15.6202 13.47 15.8202C15.57 16.4302 22 12.4401 22 9.98006C22 7.52006 15.57 3.52998 13.47 4.13998Z" stroke="#65676B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                            <span>Share</span>
                                        </div>

                                        
                                    </div>


                                </div>

                            </div>
                            ) : null
                        })}

                    </div>

                    }

                </div>

            </div>

        </div>

    </>
    
);
}

export default Profile