import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/index.css"

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import Profile from './Profile';
import Friends from './Friends';
import Teest from './Teest';
const router = createBrowserRouter([
  {
    path: "/", 
    element: <Home />,
  },
  {
    path: "/signup", 
    element: <Signup />,
  },
  {
    path: "/login", 
    element: <Login />,
  },
  {
    path:"/profile",
    element: <Profile/>
  },
  {
    path :"/friends",
    element:<Friends/>
  }
  ,
  {
    path :"/test",
    element:<Teest/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} /> 
  </StrictMode>,
)
