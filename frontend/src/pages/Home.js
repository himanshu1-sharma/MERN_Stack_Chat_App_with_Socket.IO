import React, { useEffect } from 'react'
import Navigation from './Includes/Navigation'
import { UserState } from '../Context'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const { user } = UserState({})

    const navigate = useNavigate()

    useEffect(() => {
        if (!user.token) {
            navigate('/login')
        }
    }, [user])

    return (
        <>
            <Navigation />
        </>
    )
}

export default Home