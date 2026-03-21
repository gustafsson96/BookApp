import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import logo from "../assets/logotype.png";
import "./Navbar.css";

function Navbar() {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <nav>
                <div>
                    <NavLink to="/">
                        <img src={logo} alt="Book Club logo" />
                    </NavLink>
                </div>

                <div>
                    {user ? (
                        <>
                            <NavLink to="/admin">Admin</NavLink>
                            <button onClick={handleLogout} style={{ cursor: "pointer" }}>Log Out</button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login">Login</NavLink>
                            <NavLink to="/signup">Sign Up</NavLink>
                        </>
                    )}
                </div>
            </nav>
        </>
    )
}

export default Navbar;