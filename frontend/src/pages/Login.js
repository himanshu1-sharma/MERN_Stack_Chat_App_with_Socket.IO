import React from 'react'
import Navigation from './Includes/Navigation'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <>
            <Navigation />
            <div className='formBg'>
                <div className='container'>
                    <div className="login-box">
                        <p>Login</p>
                        <form>
                            <div className="user-box">
                                <input required="" name="" type="text" />
                                <label>Email</label>
                            </div>
                            <div className="user-box">
                                <input required="" name="" type="password" />
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
                        <p>Don't have an account? <Link to="/register" className="a2">Register</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login