import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

export default function App() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    );
}
