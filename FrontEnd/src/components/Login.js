import React, { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const server_ip = `http://${window.location.hostname}:3001`;

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        `${server_ip}/api/users/login`,
        {
          email,
          password,
        }
      );

      console.log(res.data);

      // LOGIN SUCCESS
      if (res.data.success) {

        // STORE USER ID
        sessionStorage.setItem(
          "userId",
          res.data.user.CustomerId
        );

        // OPTIONAL USER NAME
        sessionStorage.setItem(
          "userName",
          res.data.user.CustomerName
        );

        // Force reload so that context can pick up new user ID
        window.location.href = "/product";
      }

      // LOGIN FAILED
      else {

        alert("Invalid Credentials ❌");
      }

    } catch (err) {

      console.log(err);

      alert("Login Error ❌");
    }
  };

  return (
    <div className="login-page">
      <div className="amazon-auth-logo">CartTick</div>
      
      <div className="login-card">
        <h1>Sign in</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="amazon-submit-btn">
            Continue
          </button>
        </form>
        
        <p style={{fontSize: "12px", marginTop: "15px"}}>
          By continuing, you agree to CartTick's Conditions of Use and Privacy Notice.
        </p>
      </div>

      <div style={{width: "350px"}}>
        <div className="auth-divider">New to CartTick?</div>
        <button onClick={() => navigate('/registeration')} className="create-account-btn">
          Create your CartTick account
        </button>
      </div>
    </div>
  );
};

export default Login;