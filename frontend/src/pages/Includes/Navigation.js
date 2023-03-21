import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import { UserState } from '../../Context';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {

    const { user, setUser } = UserState({})
    const navigate = useNavigate()
    const handleLogout = () => {
        setUser({})
        navigate('/login')
    }
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>
                        <Link to="/">
                            Chat App
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>
                            {!user?.token ?
                                <>
                                    <Link to="/register">
                                        <Button variant="link">Register</Button>
                                    </Link>
                                    <Link to="/login">
                                        <Button variant="link">Login</Button>
                                    </Link>
                                </>

                                :

                                <Button variant="link" onClick={handleLogout}>Logout</Button>

                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navigation