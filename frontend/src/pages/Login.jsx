import React, { useState } from "react";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { supabase } from "../lib/supabaseClient";
import "../styles/AuthPage.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    setLoading(false);
    if (error) return alert(error.message);
    navigate("/dashboard");
  }

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  }

  async function handleForgot() {
    if (!form.email) return alert("Enter your email first.");
    const { error } = await supabase.auth.resetPasswordForEmail(form.email);
    if (error) alert(error.message);
    else alert("Password reset email sent.");
  }

  return (
    <div className="auth-wrap">
      {/* Top navbar (Home, About, Contact, Log In) */}
      <header className="auth-nav">
        <div className="brand">Course Tracking</div>
        
      </header>

      <div className="auth-card">
        <div className="auth-left">
          <h2 className="auth-title">Log in</h2>

          <form className="auth-form" onSubmit={handleLogin}>
            <TextField
              label="Email Address"
              type="email"
              variant="outlined"
              size="medium"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="auth-input"
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              size="medium"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="auth-input"
            />

            <div className="auth-util">
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={form.remember}
                    onChange={(e) =>
                      setForm({ ...form, remember: e.target.checked })
                    }
                  />
                }
                label="Remember me"
              />
              <button type="button" className="linkish" onClick={handleForgot}>
                Forgot Password?
              </button>
            </div>

            <Button
              className="primary-btn"
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Log in"}
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
              or <Link to="/signup">Sign up</Link>
            </div>
          </form>
        </div>

        <div className="auth-right" aria-hidden="true" />
      </div>
    </div>
  );
}
