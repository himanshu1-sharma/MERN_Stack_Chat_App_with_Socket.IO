import React from 'react'
import Navigation from './Includes/Navigation'
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <>
            <Navigation />
            <div className='formBg'>
                <div className='container'>
                    <div className="login-box">
                        <p>Register</p>
                        <form>
                            <div className="user-box">
                                <input name="" type="text" />
                                <label>Profile</label>
                            </div>
                            <div className="user-box">
                                <input name="" type="text" />
                                <label>Name</label>
                            </div>
                            <div className="user-box">
                                <input name="" type="email" />
                                <label>Email</label>
                            </div>
                            <div className="user-box">
                                <input name="" type="password" />
                                <label>Password</label>
                            </div>
                            <a href="#">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Submit
                            </a>
                        </form>
                        <p>Already have an account? <Link to="/login" className="a2">Login</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register