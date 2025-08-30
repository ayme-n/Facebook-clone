
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./styles/Nav.css"
import "./styles/friends.css"
import Header from "./Header";
import FriendRequest from "./FriendRequest";
import { useEffect, useState } from "react";


const VITE_API_URL = import.meta.env.VITE_API_URL
function Friends(){

    const [Friends,setfriends]=useState([])
    const [Requests,SetRequest] = useState([])
    const [Users,setusers]=useState([])
    const [friends_sugg,setfriends_sugg]=useState([])
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const MyID = localStorage.getItem("id")
    let firsttime = true


    async function RemoveRequest(id) {

        const response = await fetch(`${VITE_API_URL}/requests/${id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    SetRrequests()
        
    }

        async function Add_Request(friend_id) {

        const response = await fetch(`${VITE_API_URL}/request`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({              
        MyID,friend_id
    })
    })

        SetRrequests()
        
    }


    async function SetFriends_Suggesions() {

        const response1 = await fetch(`${VITE_API_URL}/users/${MyID}/friends`)

        const data1 = await response1.json()

        const response2 = await fetch(`${VITE_API_URL}/users`)

        const data2 = await response2.json()


        const friends = data1.Friends

        const users = data2.users

        const suggestions = users.filter(user => 
            !friends.some(friend => friend.id === user.id || user.id===parseInt(MyID,10))
        );

        setfriends_sugg(suggestions)
        setusers(users)
        setfriends(friends)

        
    }
    async function SetRrequests() {

        const response = await fetch(`${VITE_API_URL}/users/${MyID}/requests_sent`)

        const data = await response.json()

        SetRequest(data.requests)

        
    }
    useEffect(()=>{

        if(firsttime){

            
            SetFriends_Suggesions()
            SetRrequests()
            
            firsttime= false

        }

    },[])


    return(
    <>


        <Header></Header>

        <div className="friends_container">

            <div className="friends_sidebar">

                <ul>
                    <li><h1>Friends</h1><div><svg width="30" height="30" viewBox="0 0 24 24" fill="#DCDDE1" xmlns="http://www.w3.org/2000/svg"><path d="M18.1125649,13.0304195C18.1454626,12.7672379,18.1701359,12.5040563,18.1701359,12.2244258C18.1701359,11.9447953,18.1454626,11.6816137,18.1125649,11.4184321L19.8479188,10.0614018C20.0041828,9.93803541,20.045305,9.71597592,19.9466119,9.53503855L18.3017267,6.68938723C18.2030336,6.50844986,17.9809741,6.44265446,17.8000367,6.50844986L15.7521547,7.33089244C15.3244846,7.00191541,14.8639167,6.73050936,14.3622268,6.52489871L14.0496986,4.34542588C14.0250253,4.14803966,13.8523124,4,13.6467017,4H10.3569314C10.1513208,4,9.97860782,4.14803966,9.95393455,4.34542588L9.64140637,6.52489871C9.13971639,6.73050936,8.67914855,7.01013984,8.25147841,7.33089244L6.20359639,6.50844986C6.0144346,6.43443003,5.80059953,6.50844986,5.70190642,6.68938723L4.05702126,9.53503855C3.95010373,9.71597592,3.99945028,9.93803541,4.15571437,10.0614018L5.89106821,11.4184321C5.85817051,11.6816137,5.83349723,11.9530197,5.83349723,12.2244258C5.83349723,12.4958318,5.85817051,12.7672379,5.89106821,13.0304195L4.15571437,14.3874498C3.99945028,14.5108161,3.95832815,14.7328756,4.05702126,14.913813L5.70190642,17.7594643C5.80059953,17.9404017,6.02265902,18.0061971,6.20359639,17.9404017L8.25147841,17.1179591C8.67914855,17.4469361,9.13971639,17.7183422,9.64140637,17.9239528L9.95393455,20.1034257C9.97860782,20.3008119,10.1513208,20.4488516,10.3569314,20.4488516H13.6467017C13.8523124,20.4488516,14.0250253,20.3008119,14.0496986,20.1034257L14.3622268,17.9239528C14.8639167,17.7183422,15.3244846,17.4387117,15.7521547,17.1179591L17.8000367,17.9404017C17.9891985,18.0144215,18.2030336,17.9404017,18.3017267,17.7594643L19.9466119,14.913813C20.045305,14.7328756,20.0041828,14.5108161,19.8479188,14.3874498L18.1125649,13.0304195Z M12.0018166,15.1029748C10.4145024,15.1029748,9.12326754,13.81174,9.12326754,12.2244258C9.12326754,10.6371116,10.4145024,9.34587676,12.0018166,9.34587676C13.5891307,9.34587676,14.8803656,10.6371116,14.8803656,12.2244258C14.8803656,13.81174,13.5891307,15.1029748,12.0018166,15.1029748Z"></path></svg></div></li>
                    <li><div><i aria-hidden="true" style={{backgroundImage:`url("https://static.xx.fbcdn.net/rsrc.php/v4/yX/r/4WPKeZhFbFO.png")`,backgroundPosition:"0 -632px",backgroundSize:"auto",width:"20px",height:"20px",backgroundRepeat:"no-repeat",display:"inline-block",filter:"brightness(0) saturate(100%) invert(91%) sepia(4%) saturate(167%) hue-rotate(202deg) brightness(92%) contrast(93%)"}}></i></div>Home</li>
                    <li><div><i aria-hidden="true" style={{backgroundImage:`url("https://static.xx.fbcdn.net/rsrc.php/v4/y4/r/Hz99ABbbI2t.png")`,backgroundPosition:"-21px -310px",backgroundSize:"auto",width:"20px",height:"20px",backgroundRepeat:"no-repeat",display:"inline-block",filter:"brightness(0) saturate(100%) invert(91%) sepia(4%) saturate(167%) hue-rotate(202deg) brightness(92%) contrast(93%)"}}></i></div>Friend Requests</li>
                    <li><div><i aria-hidden="true" style={{backgroundImage:`url("https://static.xx.fbcdn.net/rsrc.php/v4/yE/r/h3v6f7dYlNc.png")`,backgroundPosition:"0 -297px",backgroundSize:"auto",width:"20px",height:"20px",backgroundRepeat:"no-repeat",display:"inline-block",filter:"brightness(0) saturate(100%) invert(91%) sepia(4%) saturate(167%) hue-rotate(202deg) brightness(92%) contrast(93%)"}}></i></div>Suggestions</li>
                    <li><div><i aria-hidden="true" style={{backgroundImage:`url("https://static.xx.fbcdn.net/rsrc.php/v4/yE/r/h3v6f7dYlNc.png")`,backgroundPosition:"0 -318px",backgroundSize:"auto",width:"20px",height:"20px",backgroundRepeat:"no-repeat",display:"inline-block",filter:"brightness(0) saturate(100%) invert(91%) sepia(4%) saturate(167%) hue-rotate(202deg) brightness(92%) contrast(93%)"}}></i></div>All friends</li>
                    <li><div><i aria-hidden="true" style={{backgroundImage:`url("https://static.xx.fbcdn.net/rsrc.php/v4/yE/r/h3v6f7dYlNc.png")`,backgroundPosition:"0 -360px",backgroundSize:"auto",width:"20px",height:"20px",backgroundRepeat:"no-repeat",display:"inline-block",filter:"brightness(0) saturate(100%) invert(91%) sepia(4%) saturate(167%) hue-rotate(202deg) brightness(92%) contrast(93%)"}}></i></div>Birthdays</li>
                    <li><div><i aria-hidden="true" style={{backgroundImage:`url("https://static.xx.fbcdn.net/rsrc.php/v4/yE/r/h3v6f7dYlNc.png")`,backgroundPosition:"0 -318px",backgroundSize:"auto",width:"20px",height:"20px",backgroundRepeat:"no-repeat",display:"inline-block",filter:"brightness(0) saturate(100%) invert(91%) sepia(4%) saturate(167%) hue-rotate(202deg) brightness(92%) contrast(93%)"}}></i></div>Custom Links</li>
                </ul>

            </div>

            <div className="friends_body">


                <h3>People you may know</h3>
                
                <div className="friends_list">


                    {friends_sugg.map(friend => {
                    
                        const match = Requests.find(r => r.ReceiverID === friend.id);

                        return (

                            <div key={friend.id} className="friend">


                                <img className="friend_icon" src={friend.icon} alt="icon" />

                                <div className="friend_footer">
                                    <h3>{friend.name}</h3>
                                                                                                            
                                   

                                    { !match ? (
                                        <>
                                        <button 
                                            className="add_button"
                                            onClick={() => Add_Request(friend.id)} 
                                        >
                                            Add friend
                                        </button>

                                        <button 
                                            className="remove_button" 
                                            onClick={() => {
                                            const array = friends_sugg.filter(fr => fr.id !== friend.id);
                                            setfriends_sugg(array);
                                            }}
                                        >
                                            Remove
                                        </button>
                                        </>
                                    ) : (
                                        <>
                                        <p>Request sent</p>
                                        <button 
                                            className="cancel_button" 
                                            onClick={() => RemoveRequest(match.id)}  
                                        >
                                            Cancel
                                        </button>
                                        </>
                                    )}
                                    

                                    
                                </div>

                                

                            </div>

                        )
                    })
                    }


                </div>

            </div>
    
        </div>
    </>
    )

}

export default Friends