import React, { useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useAuth } from "../../context/AuthContextlog"
import { Link, useNavigate  } from 'react-router-dom'
import "./login.css"
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";


export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()
    

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setloading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            
            .then((userCredential) => { 
                const user = userCredential.user;
                updateDoc(doc(db, "users", user.uid), {
                isOnline: true,
            });
            })

            if(emailRef.current.value === "admin@gmail.com") {
                navigate('/dashboard');
            }else {
            navigate('/');
            }
        } catch {
            setError("Failed to log in")
        }
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
                                    <h3 className="display-4">SIGN IN</h3>
                                    {error && <Alert vairant ="danger">{error}</Alert> }    
                                    <form onSubmit={ handleSubmit } >
                                        <div className="form-group mb-3">
                                            <input id="inputEmail" type="email" ref={emailRef} placeholder="Email address" required="" autoFocus="" className="form-control rounded-pill border-0 shadow-sm px-4"/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <input id="inputPassword" type="password" ref={passwordRef} placeholder="Password" required="" className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"/>
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Sign in</button>
                                        <div>Need an account?  <Link to="/signup">Sign Up</Link></div>
                                        <Link to="/forgot-password">Forgot Password?</Link>
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

