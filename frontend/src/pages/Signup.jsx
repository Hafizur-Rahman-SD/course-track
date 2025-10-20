import * as React from "react";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import AppLayout from "../components/AppLayout";
import { Card, CardContent, TextField, Button, Typography, Stack, Alert } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);
    setNotice("");
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) return setNotice(error.message);
    setNotice("✅ Account created! Check your email to verify.");
    setTimeout(() => navigate("/login"), 1200);
  }

  return (
    <AppLayout>
      <Card sx={{ maxWidth: 480, mx: "auto" }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} mb={2}>Create your account</Typography>
          {notice && <Alert severity={notice.startsWith("✅") ? "success" : "error"} sx={{ mb: 2 }}>{notice}</Alert>}
          <form onSubmit={handleSignup}>
            <Stack spacing={2}>
              <TextField label="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
              <TextField label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? "Creating..." : "Sign up"}
              </Button>
              <Typography variant="body2">Already have an account? <Link to="/login">Login</Link></Typography>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
