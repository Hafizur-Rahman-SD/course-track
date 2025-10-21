import React, { useState } from "react";
import { TextField, Button, Typography, Box, Stack } from "@mui/material";
import { supabase } from "../lib/supabaseClient";
import { useNavigate, Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import "../styles/Auth.css";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: { data: { name: formData.name } },
    });
    if (error) alert(error.message);
    else alert("Signup successful! Please verify your email.");
  }

  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  }

  return (
    <Box className="auth-container">
      <Box className="left-panel">
        <Typography variant="h4" color="white" fontWeight={700}>
          Welcome Back!
        </Typography>
        <Typography color="white" sx={{ mt: 1, mb: 3 }}>
          Please login with your personal info
        </Typography>
        <Button component={Link} to="/login" variant="outlined" color="inherit">
          SIGN IN
        </Button>
      </Box>

      <Box className="right-panel">
        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
          Sign Up
        </Typography>

        <Stack spacing={2} sx={{ width: "80%", maxWidth: "350px" }}>
          <TextField
            label="Name"
            variant="outlined"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Email"
            variant="outlined"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <Button variant="contained" onClick={handleSignup}>
            SIGN UP
          </Button>

          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
