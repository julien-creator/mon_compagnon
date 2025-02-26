import Loading from "./Components/Loading";
import useCheckAuth from "./Hooks/UseCheckAuth";
import AdminRouter from "./Router/AdminRouter";
import UserRouter from "./Router/UserRouter";

function App() {
  const [user, isLoading] = useCheckAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (user.role === "admin") {
    return <AdminRouter />;
  } else return <UserRouter />;
}
export default App;