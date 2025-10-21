import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { supabase } from "../lib/supabaseClient";
import "../styles/AuthPage.css";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      return alert("Please fill all required fields.");
    }
    if (form.password !== form.confirm) {
      return alert("Passwords do not match.");
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { name: form.name } },
    });
    setLoading(false);
    if (error) return alert(error.message);
    alert("Signup successful! Please verify your email and then login.");
    navigate("/login");
  }

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  }

  return (
    <div className="auth-wrap">
      {/* Top navbar (Home, About, Contact, Sign Up) */}
      <header className="auth-nav">
        <div className="brand">Course Tracking</div>
        <nav>
          <Link to="/">Home</Link>
          
        </nav>
      </header>

      {/* Main card */}
      <div className="auth-card">
        <div className="auth-left">
          <h2 className="auth-title">Sign up</h2>

          <form className="auth-form" onSubmit={handleSignup}>
            <TextField
              label="Full Name"
              variant="outlined"
              size="medium"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="auth-input"
            />
            <TextField
              label="Email Address"
              type="email"
              variant="outlined"
              size="medium"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="auth-input"
            />
            <div className="auth-row">
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                size="medium"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="auth-input"
              />
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                size="medium"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                className="auth-input"
              />
            </div>

            <Button
              className="primary-btn"
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </Button>

            <button
              type="button"
              className="google-btn"
              onClick={signInWithGoogle}
            >
              <GoogleIcon className="gicon" />
              Continue with Google
            </button>

            <div className="auth-alt">
              or <Link to="/login">Log in</Link>
            </div>
          </form>
        </div>

        {/* Right decorative panel */}
        <div className="auth-right" aria-hidden="true" />
      </div>
    </div>
  );
}
