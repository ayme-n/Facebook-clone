
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
const VITE_API_URL = import.meta.env.VITE_API_URL
import "./styles/CreateComment.css"
import { format, compareAsc } from "date-fns";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";


function CreateComment({open,setOpen,User,post,liked,LikePost,Comments}){

        const MyID = localStorage.getItem("id")
        const [CommentText,SetCommentText]=useState("")
        const [comments,SetComments]=useState(Comments)


        async function GetComments() {

        const response = await fetch (`${VITE_API_URL}/posts/${post.id}/comments`)

        const data = await response.json()

        console.log(data.comments)

        SetComments(data.comments)
        
    }




        async function send_comment() {


            const response = await fetch(`${VITE_API_URL}/posts/${post.id}/comment`,
                {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({              
                    text : CommentText,
                    CommenterID : MyID,

                })
                }
            )

            const data = await response.json()

            SetCommentText("")

            GetComments()
            
        }


        

    
    const navigate = useNavigate();

    
return  (

    
    <>
        <div className="overlay"></div>

        <div className="create_comment_container">

        
            <div className="create_comment_header">
                <h3>{User.name} Post</h3>

                <div className="remove_icon_container" onClick={()=>setOpen(false)}>
                    <svg id="remove_icon_comment" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20" width="20" height="20" fill="currentColor" aria-hidden="true" className="x14rh7hd x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq" style={{ "--x-color": "var(--secondary-icon)" }}><path d="M15.543 3.043a1 1 0 1 1 1.414 1.414L11.414 10l5.543 5.542a1 1 0 0 1-1.414 1.415L10 11.414l-5.543 5.543a1 1 0 0 1-1.414-1.415L8.586 10 3.043 4.457a1 1 0 1 1 1.414-1.414L10 8.586l5.543-5.543z" fill="#B0B3B8"/></svg>

                </div>
            </div>
            <hr />
            <div className="create_comment_body">
                <div className="post">
                
                    <div className="header_post">

                        <div className="profile">
                            <img className="comment_icon" src={User.icon} alt="" />

                            <div className="right">
                                <span id="name_comment">{User.name}</span>
                                <span id="date_comment">{formatDistanceToNow(new Date(post.created_at), { addSuffix: true }).replace("about ", "")}</span>
                            </div>                      
                        </div>

                        
                        <svg id="options_icon_comment" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20" width="20" height="20" fill="currentColor" className="x14rh7hd x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq" style={{"--x-color":"var(--secondary-icon)"}}><g fillRule="evenodd" transform="translate(-446 -350)" fill="#B0B3B8"><path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"/></g></svg>
                        

                    </div>

                    <div className="body">

                    <p>{post.text}</p>

                    </div>

                    <div className="footer_post">

                        <div className="footer_up">

                            <div className="footer_left">
                                <img id="like_icon_comment" className="x16dsc37" height="18" width="18" role="presentation" src="data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint2_radial_15251_63610)' fill-opacity='.5'/%3E%3Cpath d='M7.3014 3.8662a.6974.6974 0 0 1 .6974-.6977c.6742 0 1.2207.5465 1.2207 1.2206v1.7464a.101.101 0 0 0 .101.101h1.7953c.992 0 1.7232.9273 1.4917 1.892l-.4572 1.9047a2.301 2.301 0 0 1-2.2374 1.764H6.9185a.5752.5752 0 0 1-.5752-.5752V7.7384c0-.4168.097-.8278.2834-1.2005l.2856-.5712a3.6878 3.6878 0 0 0 .3893-1.6509l-.0002-.4496ZM4.367 7a.767.767 0 0 0-.7669.767v3.2598a.767.767 0 0 0 .767.767h.767a.3835.3835 0 0 0 .3835-.3835V7.3835A.3835.3835 0 0 0 5.134 7h-.767Z' fill='%23fff'/%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(90 .0005 8) scale(7.99958)'%3E%3Cstop offset='.5618' stop-color='%230866FF' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230866FF' stop-opacity='.1'/%3E%3C/radialGradient%3E%3CradialGradient id='paint2_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(45 -4.5257 10.9237) scale(10.1818)'%3E%3Cstop offset='.3143' stop-color='%2302ADFC'/%3E%3Cstop offset='1' stop-color='%2302ADFC' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.3989' y1='2.3999' x2='13.5983' y2='13.5993' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2302ADFC'/%3E%3Cstop offset='.5' stop-color='%230866FF'/%3E%3Cstop offset='1' stop-color='%232B7EFF'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E"/>
                                <span>{post.likes?.length ?? 0} </span> 
                            </div>

                            <div className="footer_right">
                                <div>
                                    <span>{Comments?.length}</span>
                                    <i id="comment_icon_fill_comment" style={{ width: "16px", height: "16px", backgroundColor: "#A9ABB0", WebkitMaskImage: "url('https://static.xx.fbcdn.net/rsrc.php/v4/yH/r/Eoi2rFThRn5.png?_nc_eui2=AeGu1GB0UyJ3T4fUUoVSdaWfYNlteT7JYllg2W15PsliWdQ3CfwJ0uzFwyPGeMgVOdglE3UKYlVWb8XOhdVD3xiL')", WebkitMaskPosition: "0px -1076px", WebkitMaskRepeat: "no-repeat", WebkitMaskSize: "auto", maskImage: "url('https://static.xx.fbcdn.net/rsrc.php/v4/yH/r/Eoi2rFThRn5.png?_nc_eui2=AeGu1GB0UyJ3T4fUUoVSdaWfYNlteT7JYllg2W15PsliWdQ3CfwJ0uzFwyPGeMgVOdglE3UKYlVWb8XOhdVD3xiL')", maskPosition: "0px -1076px", maskRepeat: "no-repeat", maskSize: "auto", display: "inline-block" }}></i>
                                </div>
                            </div>
                        </div>

                        <hr />

                        <div className="footer_down">                         
                            <div onClick={()=>{LikePost(post.id) ;liked = !liked}}> 
                                <svg  id="like_icon_comment_svg" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill={liked ? "#1A74FF" : "#9ca0a7ff"} viewBox="0 0 14 14"><path d="M7.3014 3.8662a.6974.6974 0 0 1 .6974-.6977c.6742 0 1.2207.5465 1.2207 1.2206v1.7464h1.7953c.992 0 1.7232.9273 1.4917 1.892l-.4572 1.9047a2.301 2.301 0 0 1-2.2374 1.764H6.9185a.5752.5752 0 0 1-.5752-.5752V7.7384c0-.4168.097-.8278.2834-1.2005l.2856-.5712a3.6878 3.6878 0 0 0 .3893-1.6509l-.0002-.4496ZM4.367 7a.767.767 0 0 0-.7669.767v3.2598a.767.767 0 0 0 .767.767h.767a.3835.3835 0 0 0 .3835-.3835V7.3835A.3835.3835 0 0 0 5.134 7h-.767Z"/></svg>
                                <span style={{color:liked ? "#1A74FF" : "#9ca0a7ff"}}>Like</span> 
                            </div>
                    
                            <div>
                                <i id="comment_icon_comment" style={{ width: "20px", height: "20px", backgroundColor: "#A9ABB0", WebkitMaskImage: "url('https://static.xx.fbcdn.net/rsrc.php/v4/yX/r/4WPKeZhFbFO.png?_nc_eui2=AeFWnrzvGbGbccvRXjM1Pg4wcArWTkDIxU1wCtZOQMjFTWiQRa1GWQUfyWFhIFDDIBt6kwlvcWV49sugESbgGpNs')", WebkitMaskPosition: "0px -821px", WebkitMaskRepeat: "no-repeat", WebkitMaskSize: "auto", maskImage: "url('https://static.xx.fbcdn.net/rsrc.php/v4/yX/r/4WPKeZhFbFO.png?_nc_eui2=AeFWnrzvGbGbccvRXjM1Pg4wcArWTkDIxU1wCtZOQMjFTWiQRa1GWQUfyWFhIFDDIBt6kwlvcWV49sugESbgGpNs')", maskPosition: "0px -821px", maskRepeat: "no-repeat", maskSize: "auto", display: "inline-block" }}></i>
                                <span>Comment</span>
                            </div>

                            <div>
                                <i id="share_icon_comment" style={{ width: "20px", height: "20px", backgroundColor: "#A9ABB0", WebkitMaskImage: "url('https://static.xx.fbcdn.net/rsrc.php/v4/yX/r/4WPKeZhFbFO.png?_nc_eui2=AeFWnrzvGbGbccvRXjM1Pg4wcArWTkDIxU1wCtZOQMjFTWiQRa1GWQUfyWFhIFDDIBt6kwlvcWV49sugESbgGpNs')", WebkitMaskPosition: "0px -884px", WebkitMaskRepeat: "no-repeat", WebkitMaskSize: "auto", maskImage: "url('https://static.xx.fbcdn.net/rsrc.php/v4/yX/r/4WPKeZhFbFO.png?_nc_eui2=AeFWnrzvGbGbccvRXjM1Pg4wcArWTkDIxU1wCtZOQMjFTWiQRa1GWQUfyWFhIFDDIBt6kwlvcWV49sugESbgGpNs')", maskPosition: "0px -884px", maskRepeat: "no-repeat", maskSize: "auto" }}></i>
                                <span>Share</span>
                            </div>
                        </div>

                        <hr />


                    </div>
                
                </div>

                <div className="comments">

                    

                   {
                   
                    comments.map((comment)=>{
                        return (
                            <div key={comment.id} className="comment">

                                <img className="comment_icon" src={comment.Commenter.icon} alt="" />

                                <div className="comment_body">
                                    <span>{comment.Commenter.name}</span>
                                    <p>{comment.text}</p>
                                </div>

                                <div className="comment_footer">
                                    
                                    <span>{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true }).replace("about ", "")}</span>
                                    <span>Like</span>
                                    <span>reply</span>
                                </div>

                            </div>
                        )
                    })
                   }

                </div>
                
            </div>

            <div className="footer">
                <img className="comment_icon" src={User.icon} alt="" />
                
                <div>

                    <textarea  name="comment" id="comment_input_comment" placeholder="Write a comment..." value={CommentText} onChange={(e)=>{SetCommentText(e.target.value)}}></textarea>
                    <svg id="send" onClick={()=>send_comment()} style={{cursor:CommentText?"pointer":"not-allowed"}}  stroke={CommentText?"#3b3bd4ff":"#565657"} width="25" height="25" viewBox="-1.68 -1.68 27.36 27.36" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"  strokeWidth="1.008"> <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"></path> </g><g id="SVGRepo_iconCarrier"> <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"  strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            
                </div>
            </div>
        </div>

    </> 
    
) ;
}

export default CreateComment