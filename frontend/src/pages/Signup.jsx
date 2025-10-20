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

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: "http://localhost:3000/login" },
    });

    if (error) setNotice(error.message);
    else {
      setNotice("✅ Check your inbox to verify your email before logging in.");
      setOpen(true);
      setTimeout(() => navigate("/login"), 3000);
    }
  }

  async function handleGoogleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: "http://localhost:3000/dashboard" },
    });
    if (error) setNotice(error.message);
    else {
      setNotice("✅ Google Login initiated. Check your mail if required.");
      setOpen(true);
    }
  }

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 6, p: 2 }}>
      <CardContent>
        <Typography variant="h5" fontWeight={700} mb={2}>
          Create your account
        </Typography>
        {notice && <Alert severity={notice.startsWith("✅") ? "success" : "error"}>{notice}</Alert>}
        <form onSubmit={handleSignup}>
          <Stack spacing={2}>
            <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Button type="submit" variant="contained">Sign Up</Button>
            <Button
              onClick={handleGoogleLogin}
              startIcon={<GoogleIcon />}
              variant="outlined"
            >
              Sign up with Google
            </Button>
            <Typography variant="body2">
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </Stack>
        </form>

        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={() => setOpen(false)}
          message={notice}
        />
      </CardContent>
    </Card>
  );
}
