import { useNavigate } from "react-router-dom";
import "../css/home.css";

export default function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate("/login");
    };

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="home-container">
            <div className="home-box">
                <h1>Welcome, {user?.name || "User"}</h1>
                <p>You are successfully logged in to TheBrand.</p>

                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}
