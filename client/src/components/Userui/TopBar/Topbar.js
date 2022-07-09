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
          {currentUser.uid === "XXwOFj5YJpPHrZ69AqoEkmtpU0w2" ? (
            <>
            <Navbar.Brand href="/admin">Harmony Hills</Navbar.Brand>
            </>
            ) : (
            <>
            <Navbar.Brand href="/">Harmony Hills</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link href="/Message">Messages</Nav.Link>
            <Nav.Link href="/Usertransactionlist">Transaction</Nav.Link>
            <Nav.Link href="/UserReservationlist">Reports</Nav.Link>
            <Nav.Link href="/reports/addreports">Reports</Nav.Link>
            </Nav>
            </>
          )}
        </Container>
        <div className="topRight">
        <div className="nicon">
      <NotificationsActiveIcon color="primary" />
      </div>
      <div className="nicon" style={{ color: "white" }}>
        {currentUser.email}
      </div>
        <LogoutIcon color="primary" onClick={handleLougout}/>
      </div> 
    </Navbar>
      
  );
}

export default Topbar
