import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Home />} /> {/* Reuse Home for now */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Login />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
