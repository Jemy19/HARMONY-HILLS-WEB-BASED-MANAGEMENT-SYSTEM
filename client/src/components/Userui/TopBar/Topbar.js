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
  const { logout, currentUser } = useAuth()
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
        <Navbar.Brand href="/">Harmony Hills</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/Mohad">messages</Nav.Link>
            <Nav.Link href="#home">Transaction</Nav.Link>
            <Nav.Link href="#reports">Reports</Nav.Link>
          </Nav>
        </Container>
        <div className="topRight">
        <div className="nicon">
      <NotificationsActiveIcon color="primary" />
      </div>
        <div style={{ color: "white" }}>
        {currentUser.email}
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
