import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Stack,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Navbar() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(90deg, #1976d2 0%, #1565c0 100%)",
        boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            fontWeight={800}
            sx={{
              color: "#fff",
              textDecoration: "none",
              letterSpacing: 0.5,
            }}
          >
            🎓 CourseTrack
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              component={Link}
              to="/"
              sx={{
                color: "#fff",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/dashboard"
              sx={{
                color: "#fff",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              Dashboard
            </Button>
            <Button
              component={Link}
              to="/profile"
              sx={{
                color: "#fff",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              Profile
            </Button>
            <Button
              onClick={handleLogout}
              variant="contained"
              sx={{
                textTransform: "none",
                fontWeight: 600,
                backgroundColor: "#fff",
                color: "#1565c0",
                "&:hover": {
                  backgroundColor: "#f1f1f1",
                },
              }}
            >
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
