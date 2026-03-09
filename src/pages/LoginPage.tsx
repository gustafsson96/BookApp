import { useState, type SyntheticEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // States for error messages
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");

  // Validate each input field
  const validateForm = () => {
    let valid = true;

    setEmailError("");
    setPasswordError("");
    setApiError("");

    if (!email.trim()) {
      setEmailError("Please enter your email");
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError("Please enter your password");
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate input
    const isValid = validateForm();

    // Stop if validation is unsuccessful
    if (!isValid) return;

    try {
      await login({ email, password });
      // Redirect after successful login
      navigate("/admin");
    } catch (err: any) {
      if (err.response?.status === 401) {
        setApiError("Invalid email or password");
      } else if (err.response?.status >= 500) {
        setApiError("Server error. Please try again later.");
      } else {
        setApiError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {apiError && <p className="error-message">{apiError}</p>}
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
              setApiError("");
            }}
          />
          {emailError && <p className="field-error">{emailError}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
              setApiError("");
            }}
          />
          {passwordError && <p className="field-error">{passwordError}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginPage;