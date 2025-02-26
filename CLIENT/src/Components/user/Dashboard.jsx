import { useSelector } from "react-redux";
import useCloseMenu from "../../Hooks/useCloseMenu";

function Dashboard() {
    useCloseMenu();

    const user = useSelector((state) => state.user);

    return (
        <main id="dashboard">
            <h2>Hello {user.username}</h2>

            <section>
                <h3>Your profile</h3>



            </section>
        </main>
    );
}

export default Dashboard;
