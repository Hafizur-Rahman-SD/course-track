import * as React from "react";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Stack,
  Alert,
  Snackbar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import EmailIcon from "@mui/icons-material/Email";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setNotice(error.message);
      setOpen(true);
    } else if (data.session) {
      setNotice("✅ Login successful!");
      setOpen(true);
      setTimeout(() => navigate("/dashboard"), 1500);
    }
  }

  async function handleGoogleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: "http://localhost:3000/dashboard" },
    });
    if (error) {
      setNotice(error.message);
      setOpen(true);
    }
  }

  async function handleForgotPassword() {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password",
    });
    if (error) {
      setNotice(error.message);
    } else {
      setNotice("📩 Password reset link sent to your email.");
    }
    setOpen(true);
  }

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 6, p: 2 }}>
      <CardContent>
        <Typography variant="h5" fontWeight={700} mb={2}>
          Login to your account
        </Typography>

        {notice && <Alert severity={notice.startsWith("✅") ? "success" : "info"}>{notice}</Alert>}

        <form onSubmit={handleLogin}>
          <Stack spacing={2}>
            <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <Button type="submit" variant="contained">Login</Button>

            <Button
              onClick={handleGoogleLogin}
              startIcon={<GoogleIcon />}
              variant="outlined"
            >
              Continue with Google
            </Button>

            <Button
              startIcon={<EmailIcon />}
              color="secondary"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </Button>

            <Typography variant="body2">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </Typography>
          </Stack>
        </form>

        <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)} message={notice} />
      </CardContent>
    </Card>
  );
}
