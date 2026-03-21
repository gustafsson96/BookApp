import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logotype.png";
import "./Navbar.css";

function Navbar() {
    const { user, logout } = useAuth();

    const [message, setMessage] = useState("");

    const handleLogout = () => {
        logout();
        setMessage("You have been logged out");
        setTimeout(() => {
            setMessage("");
        }, 3000);
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
            <div className="logout-message-container">
                {message && <p className="logout-message">{message}</p>}
            </div>
        </>
    )
}

export default Navbar;