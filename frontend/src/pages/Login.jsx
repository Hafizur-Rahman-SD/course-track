import * as React from "react";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import AppLayout from "../components/AppLayout";
import { Card, CardContent, TextField, Button, Typography, Stack, Alert } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setNotice("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setNotice(error.message);
    navigate("/dashboard");
  }

  async function loginWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) setNotice(error.message);
  }

  return (
    <AppLayout>
      <Card sx={{ maxWidth: 480, mx: "auto" }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} mb={2}>Login</Typography>
          {notice && <Alert severity="error" sx={{ mb: 2 }}>{notice}</Alert>}
          <form onSubmit={handleLogin}>
            <Stack spacing={2}>
              <TextField label="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
              <TextField label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? "Signing in..." : "Login"}
              </Button>
              <Button onClick={loginWithGoogle} startIcon={<GoogleIcon />} variant="outlined">
                Continue with Google
              </Button>
              <Typography variant="body2">No account? <Link to="/signup">Create one</Link></Typography>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
