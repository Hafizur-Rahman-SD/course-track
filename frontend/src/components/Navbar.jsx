import * as React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Navbar() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: "1px solid #eee" }}>
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>CourseTrack</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button component={Link} to="/" variant="text">Home</Button>
        <Button component={Link} to="/dashboard" variant="text">Dashboard</Button>
        <Button component={Link} to="/login" variant="outlined">Login</Button>
        <Button component={Link} to="/signup" variant="contained">Sign Up</Button>
        <Button onClick={handleLogout} variant="text">Logout</Button>
      </Toolbar>
    </AppBar>
  );
}
