import React, { useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useAuth } from "../../context/AuthContextlog"
import { Link } from 'react-router-dom'
import "./login.css"

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setloading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage('')
            setError("")
            setloading(true)
            await resetPassword(emailRef.current.value)
            setMessage('check your inbox for further instructions')
        } catch {
            setError("Failed to reset password")
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
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 col-xl-7 mx-auto">
                                    <h3 className="display-4">Password Reset</h3>
                                    {error && <Alert vairant ="danger">{error}</Alert> }   
                                    {message && <Alert vairant ="success">{message}</Alert> } 
                                    <form onSubmit={ handleSubmit } >
                                        <div className="form-group mb-3">
                                            <input id="inputEmail" type="email" ref={emailRef} placeholder="Email address" required="" autoFocus="" className="form-control rounded-pill border-0 shadow-sm px-4"/>
                                        </div>
                                        <button disabled={loading} type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Reset Password</button>
                                        <div><Link to="/login">Login</Link> </div>
                                        <div>Need an account?  <Link to="/signup">Sign Up</Link></div>
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

