import React, { useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useAuth } from "../../context/AuthContextlog"
import { Link, useNavigate } from 'react-router-dom'
import "./login.css"

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const addressRef = useRef()
    const nameRef = useRef()
    const phoneRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError("")
            setloading(true)
            await signup(emailRef.current.value, passwordRef.current.value, nameRef.current.value, addressRef.current.value, phoneRef.current.value )   
            navigate("/login");
        } catch {
            setError('Failed to create an account')
        }

        setloading(false)
    }

  return (
    <>
        <div className="container-fluid">
            <div className="row no-gutter">
                <div className="col-md-8 d-none d-md-flex bg-image"></div>
                <div className="col-md-4 bg-light">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-10 col-xl-7 mx-auto">
                                    <h3 className="display-4">SIGN UP</h3>
                                    {error && <Alert vairant ="danger">{error}</Alert> }    
                                    <form onSubmit={ handleSubmit } >
                                        <div className="form-group mb-3">
                                            <input id="inputEmail" type="email" ref={emailRef} placeholder="Email address" required="" 
                                            autoFocus="" className="form-control rounded-pill border-0 shadow-sm px-4"/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <input id="name" type="text" ref={nameRef} placeholder="Full Name" required="" 
                                            autoFocus="" className="form-control rounded-pill border-0 shadow-sm px-4"/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <input id="address" type="text" ref={addressRef} placeholder="Address" required="" 
                                            autoFocus="" className="form-control rounded-pill border-0 shadow-sm px-4"/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <input id="phone" type="tel" ref={phoneRef} placeholder="Mobile Number" required="" 
                                            autoFocus="" maxLength = "11" className="form-control rounded-pill border-0 shadow-sm px-4"/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <input id="password" type="password" ref={passwordRef} placeholder="Password" required=""
                                            className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <input id="password-confirm" type="password" ref={passwordConfirmRef} placeholder="Password Confirmation" required=""
                                            className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"/>
                                        </div>
                                        <button disabled={loading} type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Sign Up</button>
                                        <div>Already have an acount? <Link style={{ cursor: "pointer", textDecoration: 'none' }} to="/login">Log In</Link></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
