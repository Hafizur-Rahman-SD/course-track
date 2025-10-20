import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate, Link } from "react-router-dom";
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
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          CourseTrack
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button component={Link} to="/" variant="text">Home</Button>
        <Button component={Link} to="/dashboard" variant="text">Dashboard</Button>
        <Button component={Link} to="/login" variant="outlined" sx={{ ml: 1 }}>
          Login
        </Button>
        <Button component={Link} to="/signup" variant="contained" sx={{ ml: 1 }}>
          Sign up
        </Button>
        <Button onClick={handleLogout} variant="text" sx={{ ml: 1 }}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
