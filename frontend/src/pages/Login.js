import React, { useState, useEffect } from "react";
import Navigation from "./Includes/Navigation";
import { Link } from "react-router-dom";
import { UserState } from "../Context";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { BASEURL } from "../Constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser } = UserState();
    const [userData, setUserData] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await Axios.post(`${BASEURL}api/user/login`, { email, password }).then(
            (data) => {
                setUserData(data.data);
                console.log("user data", data.data);

                if (data.data.status == true) {
                    toast.success(`${data.data.msg}`, {
                        position: "bottom-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    setUser(data.data.data);
                    localStorage.setItem("userInfo", JSON.stringify(data.data.data));
                    navigate("/");
                } else {
                    toast.error(`${data.data.msg}`, {
                        position: "bottom-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }
        );
    };

    useEffect(() => {
        if (user && user.token) {
            navigate("/");
        }
    }, [user]);

    return (
        <>
            <Navigation />
            <div className="formBg">
                <div className="container">
                    <div className="login-box">
                        <p>Login</p>
                        <form>
                            <div className="user-box">
                                <input
                                    name="email"
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label>Email</label>
                            </div>
                            <div className="user-box">
                                <input
                                    name="password"
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
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
                        <p>
                            Don't have an account?{" "}
                            <Link to="/register" className="a2">
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
