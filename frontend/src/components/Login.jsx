import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { AuthContext } from "../contexts/AuthContext";



const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
   try {
      const result = await handleLogin(username, password);
      setSuccess(result.message);
      setTimeout(() => {
       navigate("/home");
         }, 1000);
       } catch (err) {
         setError(err.message);
       }

  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}
        <p>
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
