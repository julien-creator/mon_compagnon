import { Outlet } from "react-router-dom";

function Dashboard() {
    return (
        <main id="admin-dashboard">

            <Outlet />
        </main>
    );
}

export default Dashboard;