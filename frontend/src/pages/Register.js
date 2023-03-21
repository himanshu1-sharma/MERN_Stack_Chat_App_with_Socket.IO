import React, { useState } from 'react'
import Navigation from './Includes/Navigation'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Axios from "axios"
import { BASEURL } from "../Constant"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const [input, setInput] = useState({})
    const navigate = useNavigate()
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setInput({ ...input, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await Axios.post(`${BASEURL}api/user/register`, { profilepic: input.profilepic, name: input.name, email: input.email, password: input.password })
                .then(data => {
                    if (data.data.errorcode === 0) {
                        toast.success(`${data.data.message}`, {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                        setInput({})
                        navigate("/login")
                    }
                    else {
                        toast.error(`${data.data.message}`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    }
                })
        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <>
            <ToastContainer />
            <Navigation />
            <div className='formBg'>
                <div className='container'>
                    <div className="login-box">
                        <p>Register</p>
                        <form>
                            <div className="user-box">
                                <input name="profilepic" id="profilepic" type="text" value={input.profilepic || ""} onChange={handleChange} />
                                <label>Profile</label>
                            </div>
                            <div className="user-box">
                                <input name="name" id="name" type="text" value={input.name || ""} onChange={handleChange} />
                                <label>Name</label>
                            </div>
                            <div className="user-box">
                                <input name="email" id="email" type="email" value={input.email || ""} onChange={handleChange} />
                                <label>Email</label>
                            </div>
                            <div className="user-box">
                                <input name="password" id="password" type="password" value={input.password || ""} onChange={handleChange} />
                                <label>Password</label>
                            </div>
                            <a onClick={handleSubmit}>
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