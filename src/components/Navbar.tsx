import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
      };
    
    return(
        <>
        <button onClick={handleLogout}>
            Log Out
        </button>
        </>
    )
}

export default Navbar;