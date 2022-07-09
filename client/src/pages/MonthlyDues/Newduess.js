import React,{useState, useEffect} from 'react'
import './Newdues.css'
import { setDoc, doc, collection, addDoc, Timestamp, serverTimestamp, onSnapshot } from "firebase/firestore";
import {auth, db, storage} from '../../firebase'
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/esm/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const initialState = {
  name: "",
  address: "",
  phoneNumber: "",
  date:"",
  due:"",
  amount:"",
}

function Newdues({title}) {

    const [data,setData] = useState(initialState)
    const dueid = uuid();
    const navigate = useNavigate()
    const { name, address, phoneNumber, due, date,amount} = data
    const handleAdd = async (e) => {
    
        e.preventDefault();

          await setDoc(doc(db, "dues", dueid), {
            ...data,
            timeStamp: serverTimestamp(),
          })
          navigate('/listdue')
      };

    const handleInput = (e) =>{
        const id = e.target.id
        const value = e.target.value
       
        setData({...data, [id] : value})
    }
  
    console.log(data)


 

  return (
    <>
    <div className="newContainer">
    <Container id="MonthlyDueForm-container" className="d-grid">
    <Form id="MonthlyDueForm-Form" className="text-center w-100"   onSubmit = {handleAdd}>
    <h3>Payable Form</h3>

    <Form.Group controlId="Fullname">
    <FloatingLabel controlId="floatingInput" label="Full Name" className="mb-3">
          <Form.Control type="fullname" size="lg" placeholder="Fullname" autoComplete="fullname" className="position-relative" value = {name }id = 'name' onChange = {handleInput}/>
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Address">
        <FloatingLabel controlId="floatingInput" label="Address" className="mb-3">
          <Form.Control type="address" size="lg" placeholder="Address" autoComplete="address" className="position-relative" value = {address} id='address' onChange = {handleInput} />
          </FloatingLabel>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="phoneNumber">
        <FloatingLabel controlId="floatingInput" label="Contact Number" className="mb-3">
          <Form.Control type="tel" size="lg" placeholder="Address" autoComplete="address" className="position-relative" maxLength = "11" value = {phoneNumber} id='phoneNumber'  onChange = {handleInput} />
          </FloatingLabel>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="Date">
        <FloatingLabel controlId="floatingInput" label="Date" className="mb-3">
        <Form.Control type="date" name="datepic" placeholder="Date" id = 'date' value={date} onChange = {handleInput}/>
                  </FloatingLabel>
            </Form.Group>

        <Form.Select aria-label="Default select example" id = 'due' onChange = {handleInput}>
              <option>Choose Payable...</option>
              <option value="Gym">Gym</option>
              <option value="Parking">Parking</option>
              <option value="Swimming Pool">Swimming Pool</option>
              <option value="Association Monthly Due">Association Monthly Due</option>
        </Form.Select>
        
        <Form.Group className="mb-3" controlId="Amount">
        <FloatingLabel controlId="floatingInput" label="Amount" className="mb-3">
          <Form.Control type="Amount" size="lg" placeholder="Amount" autoComplete="Amount" className="position-relative"  value = {amount} id='amount' onChange = {handleInput}/>
          </FloatingLabel>
        </Form.Group>
       

        <div className="d-grid">
          <Button variant="primary" size="lg" type = 'submit'>Submit</Button>
        </div>
    </Form>
    </Container>
    </div>
    </>

  );
}

export default Newdues