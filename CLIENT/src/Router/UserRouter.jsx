import { Routes, Route } from "react-router-dom";

import Header from "../Components/user/Partials/Header";
import Home from "../Components/user/Home";
import ResidentDetails from "../Components/user/ResidentDetails"; // Import du composant



import Footer from "../Components/user/Partials/Footer";
import Login from "../Components/auth/Login";
import Register from "../Components/auth/Register";
import Resident from "../Components/user/Resident";

import AdoptionForm from "../Components/user/Partials/AdoptionForm";
import ProtectedRoute from "../HOC/ProtectedRoutes";

function UserRouter() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="resident" element={<Resident />} />
                <Route path="resident/:id" element={<ResidentDetails />} />
                <Route path="/adoption/:id" element={<ProtectedRoute element={AdoptionForm} />} />


                <Route path="*" element={<h1>404 NOT FOUND USER</h1>} />
            </Routes>
            <Footer />
        </>
    );
}

export default UserRouter;