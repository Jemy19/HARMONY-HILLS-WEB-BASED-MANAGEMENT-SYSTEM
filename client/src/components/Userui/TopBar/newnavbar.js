import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCog, faEnvelopeOpen, faSearch, faSignOutAlt, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { Row, Col, Nav, Form, Image, Navbar, Dropdown, Container, ListGroup, InputGroup } from '@themesberg/react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContextlog"
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import "./topbar.css"

const Newnavbar = (props) => {
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

    await updateDoc(doc(db, "users", currentUser.uid), {
      isOnline: false,
    });

    try {
        await logout()
        navigate('/login')
    } catch (error) {
        setError('Failed to log out')
    }
  }

  return (
    <Navbar variant="light" className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between align-items-center w-100">

          {currentUser.uid === "XXwOFj5YJpPHrZ69AqoEkmtpU0w2" ? (
            <>
            <Nav.Link className="mb-0 h3 fw-bold text-white" href="/admin">HARMONY HILLS</Nav.Link>
            </>
            ) : (
            <>
            <Nav.Link className="mb-0 h3 fw-bold text-white" href="/">HARMONY HILLS</Nav.Link>
            </>
          )}
          <div>
          {currentUser.uid === "XXwOFj5YJpPHrZ69AqoEkmtpU0w2" ? (
            <>

            </>
            ) : (
            <>
            <Nav className="me-auto">
            <Nav.Link className="mb-0 font-small fw-bold text-white" href="/">Home</Nav.Link>
            <Nav.Link className="mb-0 font-small fw-bold text-white" href="/Message">Messages</Nav.Link>
            <Nav.Link className="mb-0 font-small fw-bold text-white" href="/Usertransactionlist">Transaction</Nav.Link>
            <Nav.Link className="mb-0 font-small fw-bold text-white" href="/UserReservationlist">Reservations</Nav.Link>
            <Nav.Link className="mb-0 font-small fw-bold text-white" href="/UserEventlist">Events</Nav.Link>
            <Nav.Link className="mb-0 font-small fw-bold text-white" href="/reports/addreports">Reports</Nav.Link>
            </Nav>
            </>
          )}
          </div>

          <Nav className="align-items-center">

            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0 text-white">
                <span className="mb-0 font-small fw-bold text-white">{currentUser.email}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                <Dropdown.Item className="fw-bold" onClick={handleLougout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
              
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};


export default Newnavbar;