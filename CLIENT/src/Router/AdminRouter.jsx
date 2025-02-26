import { Routes, Route } from "react-router-dom";
import Dashboard from "../Components/admin/Dashboard";

import Header from "../Components/admin/Partials/Header";
import ProtectedRoute from "../HOC/ProtectedRoutes";

import Contact from "../Components/admin/Contact";
import Adoption from "../Components/admin/Adoption";
import Resident from "../Components/admin/Resident";
import User from "../Components/admin/User";
import CreateResidentForm from "../Components/admin/Partials/CreateResidentForm";
import ResidentDetails from "../Components/admin/ResidentDetails";



function AdminRouter() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<ProtectedRoute element={Dashboard} />}>
                    <Route path="/contact" element={<ProtectedRoute element={Contact} />} />
                    <Route path="/user" element={<ProtectedRoute element={User} />} />
                    <Route path="/resident" element={<ProtectedRoute element={Resident} />} />
                    <Route
                        path="/resident/create"
                        element={<ProtectedRoute element={CreateResidentForm} />}
                    />
                    <Route
                        path="/resident/:id"
                        element={<ProtectedRoute element={ResidentDetails} />}
                    />
                    <Route path="/adoption" element={<ProtectedRoute element={Adoption} />} />
                </Route>
                <Route path="*" element={<p>NOT FOUND ADMIN</p>} />
            </Routes>
        </>
    );
}

export default AdminRouter;