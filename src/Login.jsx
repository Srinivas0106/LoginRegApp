import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./assets/login.css";
import "./assets/log.css";
import PropTypes from "prop-types";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.username);
        navigate("/dashboard"); // Redirect to Dashboard after login
      } else {
        setError(data.message || "Login failed! Try again.");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Server error! Check the API.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="heading">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
      <p>New user? <Link to="/register">Register here</Link></p>
    </div>
  );
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Login;