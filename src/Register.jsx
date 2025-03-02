import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./assets/register.css";
import "./assets/reg.css";

function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", phone: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
      } else {
        setMessage(data.message || "Registration failed!");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage("Server error! Check the API.");
    }
  };

  return (
    <div className="register-container">
      <h2 className="heading">Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      {message && <p className={message.includes("success") ? "success" : "error"}>{message}</p>}
      <p>Already a user? <Link to="/login">Login here</Link></p>
    </div>
  );
}

export default Register;