import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Avatar } from "@mui/material"
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LogoutIcon from '@mui/icons-material/Logout';
import "./topbar.css"
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContextlog"


function Topbar() {
  const[error, setError]= useState("")
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  if(location.pathname === "/login"){ 
    return null
  }
  else if(location.pathname === "/signup"){
    return null
  }
  else if(location.pathname === "/forgot-password"){
    return null
  }
  else if(location.pathname === "/"){
    return null
  }
  else if(location.pathname === "/Mohad"){
    return null
  }


    async function handleLougout() {
        setError("")

        try {
            await logout()
            navigate('/login')
        } catch (error) {
            setError('Failed to log out')
        }
    }

  return (
   
    <Navbar  bg="dark" variant="primary">
        <Container>
        <Navbar.Brand href="#home">Harmony Hills</Navbar.Brand>
        </Container>
        <div className="topRight">
        <div className="nicon">
      <NotificationsActiveIcon color="primary" />
      </div>
        <div className="avatars">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
         </div>
            <LogoutIcon color="primary" onClick={handleLougout}/>
      </div> 
    </Navbar>
      
  );
}

export default Topbar
