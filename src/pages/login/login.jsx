import { useState } from "react";
import { login } from "../../services/auth.js"; // Assuming you have a register function in your auth service
import { useNavigate } from "react-router-dom";
import "./login.css"; // Import the CSS file
import { registerUser } from "../../services/userService.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // State to differentiate between login and register
  const navigate = useNavigate();

  // Function to auto-fill the form with dummy credentials based on login or register
  const autoFillCredentials = () => {
    if (isRegistering) {
      // Registration credentials
      setEmail("eve.holt@reqres.in");
      setPassword("pistol");
    } else {
      // Login credentials
      setEmail("eve.holt@reqres.in");
      setPassword("cityslicka");
    }
  };

  const validateForm = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!password.trim()) {
      setError("Password is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      navigate("/dashboard"); // Redirect after login
    } catch (err) {
      setError(err.error || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const data = await registerUser(email, password);
      localStorage.setItem("token", data.token);
      alert("Registration successful! You can now login.");
      setIsRegistering(false); // Switch back to login form after successful registration
    } catch (err) {
      setError(err.error || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-credentials" onClick={autoFillCredentials}>
        <p>Click here to auto-fill:</p>
        <p>
          {isRegistering
            ? '"email": "eve.holt@reqres.in", "password": "pistol"'
            : '"email": "eve.holt@reqres.in", "password": "cityslicka"'}
        </p>
      </div>
      <h2 className="login-title">{isRegistering ? "Register" : "Login"}</h2>
      <form
        onSubmit={isRegistering ? handleRegister : handleLogin}
        className="login-form"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <button type="submit" disabled={loading} className="login-button">
          {loading
            ? isRegistering
              ? "Registering..."
              : "Logging in..."
            : isRegistering
            ? "Register"
            : "Login"}
        </button>
        {error && <p className="login-error">{error}</p>}
      </form>
      <button
        type="button"
        onClick={() => setIsRegistering(!isRegistering)}
        className="toggle-button"
      >
        {isRegistering
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </button>
    </div>
  );
};

export default Login;
