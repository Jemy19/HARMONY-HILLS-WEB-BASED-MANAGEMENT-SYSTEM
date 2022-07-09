import React,{useState, useEffect} from 'react'
import { setDoc, doc, collection, addDoc, Timestamp, serverTimestamp, onSnapshot } from "firebase/firestore";
import {auth, db, storage} from '../../firebase'
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';
import { Form, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/esm/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {Link} from 'react-router-dom'


const initialState = {
  name: "",
  address: "",
  sdate:"",
  edate:"",
  stime:"",
  etime:"",
  facilities:"",
  amount:"",
}

function Reservation() {

    const [data,setData] = useState(initialState)
    const reservationid = uuid();
    const navigate = useNavigate()
    const { name, address, facilities, sdate, edate,stime, etime, amount} = data
    
    const handleAdd = async (e) => {
    
        e.preventDefault();

          await setDoc(doc(db, "reservation", reservationid), {
            ...data,
            timeStamp: serverTimestamp(),
          })
          alert('Your Request Has Been Sent.')
      };

    const handleInput = (e) =>{
        const id = e.target.id
        const value = e.target.value
       
        setData({...data, [id] : value})
    }
  
    console.log(data)


  
  return (
    <>
    <div className="new">
      <div className="newContainer">
    <div style={{justifyContent:"space-between"}}className="top">
          <h1>Reservation Form</h1>
          <Link style={{padding:"10px", color:"green", border:"1px solid green", textDecoration:"none"}} to="/Reservationlist">View Rerservations</Link>
    </div>
    <Container id="MonthlyDueForm-container" className="d-grid">
    <Form id="MonthlyDueForm-Form" className="text-center w-100"   onSubmit = {handleAdd}>
    <h3>Reservation Form</h3>

    <Form.Group controlId="Fullname">
    <FloatingLabel controlId="floatingInput" label="Full Name" className="mb-3">
          <Form.Control type="fullname" size="lg" placeholder="Fullname" autoComplete="fullname" className="position-relative" value = {name }id = 'name' onChange = {handleInput} required />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Address">
        <FloatingLabel controlId="floatingInput" label="Address" className="mb-3">
          <Form.Control type="address" size="lg" placeholder="Address" autoComplete="address" className="position-relative" value = {address} id='address' onChange = {handleInput} required />
          </FloatingLabel>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="Date">
        <FloatingLabel controlId="floatingInput" label="Start Date" className="mb-3">
        <Form.Control type="date" name="datepic" placeholder="Start Date" id = 'sdate' value = {sdate}  onChange = {handleInput} required />
                  </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Date">
        <FloatingLabel controlId="floatingInput" label="End Date" className="mb-3">
        <Form.Control type="date" name="datepic" placeholder="End Date" id = 'edate' value = {edate}  onChange = {handleInput} required />
                  </FloatingLabel>
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="Date">
            <FloatingLabel controlId="floatingInput" label="Start Time " className="mb-3">
        <Form.Control type="time" name="datepic" placeholder="Start Time" id = 'stime' value = {stime}  onChange = {handleInput} required />
                  </FloatingLabel>
            </Form.Group>
          
            <Form.Group className="mb-3" controlId="Date">
            <FloatingLabel controlId="floatingInput" label="End Time" className="mb-3">
        <Form.Control type="time" name="datepic" placeholder="End Time" id = 'etime' value = {etime} onChange = {handleInput} required />
                  </FloatingLabel>
            </Form.Group>
  
            <Form.Select required aria-label="Default select example" id = 'facilities' onChange = {handleInput}>

              <option>Choose Facilities...</option>
              <option value="Basketball Court">Basketball Court</option>
              <option value="Parking">Parking</option>
              <option value="Swimming Pool">Swimming Pool</option>
              <option value="Party House">Party House</option>

            </Form.Select>
        

        <div className="d-grid">
          <Button variant="primary" size="lg" type = 'submit'>Send Request</Button>
        </div>
    </Form>
    </Container>
    </div>
    </div>
    </>
  );
}

export default Reservation