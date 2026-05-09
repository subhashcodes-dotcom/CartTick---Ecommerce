import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import './Login.css'; // Use Login CSS for consistent Amazon styling
 
const Registeration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
 
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState(false);
  
  const watchPassword = watch("password", "");
 
  const onSubmit = async (data) => {
    if (data.confirm_password === data.password) {
      setPasswordError(false);
      
      const payload = {
        customerId: Date.now().toString().slice(-10), // Must fit in varchar(10)
        customerName: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address: data.address
      };

      try {
        const res = await axios.post(`http://${window.location.hostname}:3001/api/users/register`, payload);
        if (res.data.success) {
          alert("Registration Successful ✅");
          navigate("/");
        } else {
          alert("Registration failed: " + (res.data.message || "Unknown error"));
        }
      } catch (err) {
        console.log(err);
        alert("Registration Error ❌");
      }
    } else {
      setPasswordError(true);
    }
  };
 
  const handleConfirmPasswordChange = (e) => {
    if (e.target.value === "") {
      setPasswordError(false);
    } else if (e.target.value !== watchPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };
 
  return (
    <div className="login-page">
      <div className="amazon-auth-logo">CartTick</div>
      <div className="login-card" style={{width: "350px"}}>
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <div className="form-group">
            <label htmlFor="name">Your name</label>
            <input
              type="text"
              id="name"
              placeholder="First and last name"
              {...register("name", { required: true, maxLength: 50 })}
              style={errors.name ? {borderColor: "red"} : {}}
            />
            {errors.name && <div style={{color: "red", fontSize: "12px", marginTop: "2px"}}>Name is required.</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Mobile number</label>
            <input
              type="text"
              id="phone"
              placeholder="Mobile number"
              {...register("phone", { required: true, maxLength: 15 })}
              style={errors.phone ? {borderColor: "red"} : {}}
            />
            {errors.phone && <div style={{color: "red", fontSize: "12px", marginTop: "2px"}}>Mobile number is required.</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              style={errors.email ? {borderColor: "red"} : {}}
            />
            {errors.email && <div style={{color: "red", fontSize: "12px", marginTop: "2px"}}>Email is required.</div>}
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Address"
              {...register("address", { required: true })}
              style={errors.address ? {borderColor: "red"} : {}}
            />
            {errors.address && <div style={{color: "red", fontSize: "12px", marginTop: "2px"}}>Address is required.</div>}
          </div>
 
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="At least 6 characters"
              {...register("password", { required: true, minLength: 6, maxLength: 20 })}
              style={errors.password ? {borderColor: "red"} : {}}
            />
            {errors.password && <div style={{color: "red", fontSize: "12px", marginTop: "2px"}}>Password must be at least 6 characters.</div>}
          </div>
 
          <div className="form-group">
            <label htmlFor="confirm_password">Re-enter password</label>
            <input
              type="password"
              id="confirm_password"
              {...register("confirm_password", { 
                required: true, 
                maxLength: 20,
                onChange: (e) => handleConfirmPasswordChange(e)
              })}
              style={(errors.confirm_password || passwordError) ? {borderColor: "red"} : {}}
            />
            {errors.confirm_password && <div style={{color: "red", fontSize: "12px", marginTop: "2px"}}>Confirmation is required.</div>}
            {passwordError && <div style={{color: "red", fontSize: "12px", marginTop: "2px"}}>Passwords do not match.</div>}
          </div>
 
          <button type="submit" className="amazon-submit-btn">
            Continue
          </button>
        </form>

        <p style={{fontSize: "12px", marginTop: "15px"}}>
          By creating an account, you agree to CartTick's Conditions of Use and Privacy Notice.
        </p>

        <div className="auth-divider">Already have an account?</div>
        <p style={{fontSize: "13px", textAlign: "center"}}>
          <Link to="/" style={{color: "#007185", textDecoration: "none"}}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};
 
export default Registeration;