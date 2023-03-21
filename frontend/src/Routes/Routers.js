import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import ScrollToTop from '../ScrollToTop'

const Routers = () => {
    return (
        <>
            <ScrollToTop>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </ScrollToTop>
        </>
    )
}

export default Routers