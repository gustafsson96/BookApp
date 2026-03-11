import { useState, type SyntheticEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

function SignupPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

// States for error messages and loading
  const [displayNameError, setDisplayNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  // Validate each input field
  const validateForm = () => {
    let valid = true;

    setDisplayNameError("");
    setEmailError("");
    setPasswordError("");
    setApiError("");

    if (!displayName.trim()) {
      setDisplayNameError("Please enter your name");
      valid = false;
    }

    if (!email.trim()) {
      setEmailError("Please enter your email");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError("Please enter a password");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    try {
      setLoading(true);
      await register({
        displayName,
        email,
        password,
      });

      // Redirect after successful signup
      navigate("/admin");

    } catch (err: any) {

      if (err.response?.status === 400) {
        setApiError("Invalid registration details");
      } else if (err.response?.status >= 500) {
        setApiError("Server error. Please try again later.");
      } else {
        setApiError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>

      {apiError && <p className="error-message">{apiError}</p>}

      <form onSubmit={handleSubmit} noValidate>

        <div>
          <input
            type="text"
            placeholder="Your name"
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value);
              setDisplayNameError("");
              setApiError("");
            }}
          />
          {displayNameError && <p className="field-error">{displayNameError}</p>}
        </div>
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
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
              setApiError("");
            }}
          />
          {passwordError && <p className="field-error">{passwordError}</p>}
        </div>
        <button type="submit">Sign Up</button>
        {loading && <p>Loading...</p>}
      </form>
    </div>
  );
}

export default SignupPage;