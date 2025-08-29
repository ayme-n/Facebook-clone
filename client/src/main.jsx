import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/index.css"

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import Profile from './Profile';
import Friends from './Friends';
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

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} /> 
  </StrictMode>,
)
