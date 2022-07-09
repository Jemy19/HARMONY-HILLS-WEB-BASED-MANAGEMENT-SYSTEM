
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCog, faEnvelopeOpen, faSearch, faSignOutAlt, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { Row, Col, Nav, Form, Image, Navbar, Dropdown, Container, ListGroup, InputGroup } from '@themesberg/react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContextlog"
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

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
        <div className="d-flex justify-content-between w-100">

          <Nav.Link href="/admin">HARMONY HILLS</Nav.Link>
          <Nav.Link href="/Message">Message</Nav.Link>
          <Nav.Link href="/Tba">Transaction</Nav.Link>
          <Nav.Link href="/Reservationlist">Reservationlist</Nav.Link>
          <Nav.Link href="/reports/addreports">Report</Nav.Link>
          
          
          <Nav className="align-items-center">
            <Dropdown >
              <Dropdown.Toggle as={Nav.Link} className="text-lighticon-notifications me-lg-3">
                <span className="icon icon-sm">
                  <FontAwesomeIcon icon={faBell} className="bell-shake" />
                 <span className="icon-badge rounded-circle unread-notifications" />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-center mt-2 py-0">
                <ListGroup className="list-group-flush">
                  <Nav.Link href="#" className="text-center text-primary fw-bold border-bottom border-light py-3">
                    Notifications
                  </Nav.Link>

                  <Dropdown.Item className="text-center text-primary fw-bold py-3">
                          No Notification
                  </Dropdown.Item>
                </ListGroup>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <Image className="user-avatar md-avatar rounded-circle" />
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold text-white">{currentUser.email}</span>
                  </div>
                </div>
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