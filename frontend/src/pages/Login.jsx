import * as React from "react";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Card, CardContent, TextField, Button, Typography, Stack, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setNotice(error.message);
    navigate("/dashboard");
  };

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 6, p: 2 }}>
      <CardContent>
        <Typography variant="h5" fontWeight={700} mb={2}>Login</Typography>
        {notice && <Alert severity="error">{notice}</Alert>}
        <form onSubmit={handleLogin}>
          <Stack spacing={2}>
            <TextField label="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <TextField label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <Button type="submit" variant="contained">Login</Button>
            <Typography variant="body2">No account? <Link to="/signup">Sign up</Link></Typography>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}
