import * as React from "react";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Card, CardContent, TextField, Button, Typography, Stack, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return setNotice(error.message);
    setNotice("✅ Account created! Check your email for verification.");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 6, p: 2 }}>
      <CardContent>
        <Typography variant="h5" fontWeight={700} mb={2}>Sign Up</Typography>
        {notice && <Alert severity={notice.startsWith("✅") ? "success" : "error"}>{notice}</Alert>}
        <form onSubmit={handleSignup}>
          <Stack spacing={2}>
            <TextField label="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <TextField label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <Button type="submit" variant="contained">Sign Up</Button>
            <Typography variant="body2">Already have an account? <Link to="/login">Login</Link></Typography>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}
