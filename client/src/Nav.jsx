
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./styles/Nav.css"
const VITE_API_URL = import.meta.env.VITE_API_URL
import feeds from "./assets/feeds.png";
import gaming from "./assets/gaming.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function Nav(){

    const MyID = localStorage.getItem("id")
    const [User,SetUser] = useState({
                icon:null,
                name:null,
                cover:null,
            })
    const navigate = useNavigate();

    async function GetUser() {

        const response = await fetch (`${VITE_API_URL}/users/${MyID}`)

        const data = await response.json()


        SetUser(data.user)
            }

        useEffect(()=>{
           GetUser()
        },[])
    
return (

    <div className="Nav">

    
    <Link to="/profile"><div className="allowed">
        <span title="Account" ><img id="nav_icon_profile"  src={User.icon} alt="" /></span>
        <p>{User.name}</p>
    </div></Link>
    

    <div >
        <svg id="meta_ai_icon"
      height="30"
      width="30"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
     
    >
      <title>MetaAI</title>
      <g clipPath="url(#lobe-icons-metaai-fill-0)" filter="url(#lobe-icons-metaai-fill-1)">
        <path
          clipRule="evenodd"
          d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm0 3.627a8.373 8.373 0 100 16.746 8.373 8.373 0 000-16.746z"
          fill="url(#lobe-icons-metaai-fill-2)"
          fillRule="evenodd"
        />
      </g>
      <defs>
        <linearGradient
          id="lobe-icons-metaai-fill-2"
          x1="24"
          x2="0"
          y1="0"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".13" stopColor="#FF97E3" />
          <stop offset=".18" stopColor="#D14FE1" />
          <stop offset=".338" stopColor="#0050E2" />
          <stop offset=".666" stopColor="#0050E2" />
          <stop offset=".809" stopColor="#00DDF4" />
          <stop offset=".858" stopColor="#23F8CC" />
        </linearGradient>
        <clipPath id="lobe-icons-metaai-fill-0">
          <path d="M0 0h24v24H0z" fill="#fff" />
        </clipPath>
        <filter
          id="lobe-icons-metaai-fill-1"
          x="0"
          y="0"
          width="30"
          height="30"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation=".75" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
          <feBlend in2="shape" result="effect1_innerShadow_674_237" />
        </filter>
      </defs>
        </svg>
        <p>Meta AI</p>
    </div>

    <Link to="/friends"><div className="allowed">
        <svg id="friends_nav_icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="30"
    height="30"
    >
    
    <path
        d="M7.496 5.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
        fill="#3395F7"
    />
    
    <path
        d="M16.496 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
        fill="#8AE2D6"
    />
    
    <path
        d="M5.5 15a5 5 0 0 0-5 5 3 3 0 0 0 3 3h8.006a3 3 0 0 0 3-3 5 5 0 0 0-5-5H5.5z"
        fill="#3395F7"
    />
    <path
        d="M14.5 10.5c-.671 0-1.158.46-1.333.966a5.948 5.948 0 0 1-.303.718 1.558 1.558 0 0 0 .525 1.99 7.026 7.026 0 0 1 2.663 3.34c.215.565.76.986 1.418.986h3.036a3 3 0 0 0 3-3 5 5 0 0 0-5-5H14.5z"
        fill="#8AE2D6"
    />
        </svg>
        <p>Friends</p>
    </div></Link>

    <div>
        <i id="memories_nav_icon"
      data-visualcompletion="css-img"
      className=""
      style={{
        backgroundImage:
          'url("https://static.xx.fbcdn.net/rsrc.php/v4/yA/r/FVAeV5GPLIk.png?_nc_eui2=AeFVZ5v8rYIAI3n1n1SPjoshbIsS3TALJrxsixLdMAsmvA73ifd_8MscnCjrXd6IjE1rai0zLneUEiEtd0ztruWy")',
        backgroundPosition: "0px -481px",
        backgroundSize: "auto",
        width: "36px",
        height: "36px",
        backgroundRepeat: "no-repeat",display: "inline-block",}
        }/>
        <p>Memories</p>
    </div>
 
    <div>
        <i id="saved_icon_nav"
        data-visualcompletion="css-img"
        className=""
        style={{
            backgroundImage:
            'url("https://static.xx.fbcdn.net/rsrc.php/v4/yA/r/FVAeV5GPLIk.png?_nc_eui2=AeFVZ5v8rYIAI3n1n1SPjoshbIsS3TALJrxsixLdMAsmvA73ifd_8MscnCjrXd6IjE1rai0zLneUEiEtd0ztruWy")',
            backgroundPosition: "0px -222px",
            backgroundSize: "auto",
            width: "36px",
            height: "36px",
            backgroundRepeat: "no-repeat",
            display: "inline-block",
        }}
        />
        <p>Saved</p>
    </div>


    <div>
        <i id="groups_icon_nav"
      data-visualcompletion="css-img"
      className=""
      style={{
        backgroundImage:
          'url("https://static.xx.fbcdn.net/rsrc.php/v4/yA/r/FVAeV5GPLIk.png?_nc_eui2=AeFVZ5v8rYIAI3n1n1SPjoshbIsS3TALJrxsixLdMAsmvA73ifd_8MscnCjrXd6IjE1rai0zLneUEiEtd0ztruWy")',
        backgroundPosition: "0px -74px",
        backgroundSize: "auto",
        width: "36px",
        height: "36px",
        backgroundRepeat: "no-repeat",
        display: "inline-block",
      }}
    />
    <p>Groups</p>
    </div>

    <div>
        <i id="Videos"
      data-visualcompletion="css-img"
      className=""
      style={{
        backgroundImage:
          'url("https://static.xx.fbcdn.net/rsrc.php/v4/yA/r/FVAeV5GPLIk.png?_nc_eui2=AeFVZ5v8rYIAI3n1n1SPjoshbIsS3TALJrxsixLdMAsmvA73ifd_8MscnCjrXd6IjE1rai0zLneUEiEtd0ztruWy")',
        backgroundPosition: "0px -555px",
        backgroundSize: "auto",
        width: "36px",
        height: "36px",
        backgroundRepeat: "no-repeat",
        display: "inline-block",
      }}
    />
    <p>Videos</p>
    </div>

     
    <div>
        <i id="Market"
      data-visualcompletion="css-img"
      className=""
      style={{
        backgroundImage:
          'url("https://static.xx.fbcdn.net/rsrc.php/v4/yA/r/FVAeV5GPLIk.png?_nc_eui2=AeFVZ5v8rYIAI3n1n1SPjoshbIsS3TALJrxsixLdMAsmvA73ifd_8MscnCjrXd6IjE1rai0zLneUEiEtd0ztruWy")',
        backgroundPosition: "0px -444px",
        backgroundSize: "auto",
        width: "36px",
        height: "36px",
        backgroundRepeat: "no-repeat",
        display: "inline-block",
      }}
    />
    <p>Marketplace</p>
    </div>


    <div>
        <i id="Ads_icon_nav"
      data-visualcompletion="css-img"
      className=""
      style={{
        backgroundImage:
          'url("https://static.xx.fbcdn.net/rsrc.php/v4/yq/r/_iR-92BGwSA.png?_nc_eui2=AeGLo9taT1ptZh1l9U49b3TLWXda6ifAkAtZd1rqJ8CQC_Ajbn7zck0WspAzAM8vi6fe3V2mk2voadNkMWaWjoms")',
        backgroundPosition: "0px -111px",
        backgroundSize: "auto",
        width: "36px",
        height: "36px",
        backgroundRepeat: "no-repeat",
        display: "inline-block",
      }}
    />
    <p>Ads Manager</p>
    </div>

    <div>
        <i id="Birthdays_icon_nav"
      data-visualcompletion="css-img"
      className=""
      style={{
        backgroundImage:
          'url("https://static.xx.fbcdn.net/rsrc.php/v4/yq/r/MKwrVp_7k1D.png?_nc_eui2=AeGrADOcmHJ7Aqcw8DE4oFibuLqVmFvPuxq4upWYW8-7GiP5TiDk2xkhl6E51coDqugDKjFbKFkqjEBBIg0iFY1F")',
        backgroundPosition: "0px 0px",
        backgroundSize: "auto",
        width: "36px",
        height: "36px",
        backgroundRepeat: "no-repeat",
        display: "inline-block",
      }}
    />
    <p>Birthdays</p>
    </div>


    <div>
        <i id="event_icon_nav"
      data-visualcompletion="css-img"
      className=""
      style={{
        backgroundImage:
          'url("https://static.xx.fbcdn.net/rsrc.php/v4/yA/r/FVAeV5GPLIk.png?_nc_eui2=AeFVZ5v8rYIAI3n1n1SPjoshbIsS3TALJrxsixLdMAsmvA73ifd_8MscnCjrXd6IjE1rai0zLneUEiEtd0ztruWy")',
        backgroundPosition: "0px -296px",
        backgroundSize: "auto",
        width: "36px",
        height: "36px",
        backgroundRepeat: "no-repeat",
        display: "inline-block",
      }}
    />
    <p>Events</p>
    </div>

    <div>
        <img id="feeds_icon" alt="" src={feeds} />
        <p>Feeds</p>
    </div>

    <div>
        <img id="gaming_icon" alt="gaming" src={gaming} ></img>
        <p>Gaming Video</p>
    </div>

    <div className="allowed" onClick={()=>{localStorage.removeItem("token");localStorage.removeItem("id");navigate("/login")}}>
        <svg width="30" height="30"  viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.2929 14.2929C16.9024 14.6834 16.9024 15.3166 17.2929 15.7071C17.6834 16.0976 18.3166 16.0976 18.7071 15.7071L21.6201 12.7941C21.6351 12.7791 21.6497 12.7637 21.6637 12.748C21.87 12.5648 22 12.2976 22 12C22 11.7024 21.87 11.4352 21.6637 11.252C21.6497 11.2363 21.6351 11.2209 21.6201 11.2059L18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289C16.9024 8.68342 16.9024 9.31658 17.2929 9.70711L18.5858 11H13C12.4477 11 12 11.4477 12 12C12 12.5523 12.4477 13 13 13H18.5858L17.2929 14.2929Z" fill="#B0B3B8"></path> <path d="M5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H14.5C15.8807 22 17 20.8807 17 19.5V16.7326C16.8519 16.647 16.7125 16.5409 16.5858 16.4142C15.9314 15.7598 15.8253 14.7649 16.2674 14H13C11.8954 14 11 13.1046 11 12C11 10.8954 11.8954 10 13 10H16.2674C15.8253 9.23514 15.9314 8.24015 16.5858 7.58579C16.7125 7.4591 16.8519 7.35296 17 7.26738V4.5C17 3.11929 15.8807 2 14.5 2H5Z" fill="#B0B3B8"></path> </g></svg>
        <p>Logout</p>
    </div>


    </div>
    
);
}

export default Nav