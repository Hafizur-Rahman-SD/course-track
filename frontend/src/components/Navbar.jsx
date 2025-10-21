import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "white",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        padding: "0 40px",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* ---------- Logo ---------- */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "#4a3aff",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          📘 CourseTrack
        </Typography>

        {/* ---------- Nav Links ---------- */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {[
            { label: "Home", path: "/" },
            { label: "About", path: "/about" },
            { label: "Contact", path: "/contact" },
            { label: "Login", path: "/login" },
          ].map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                color: location.pathname === item.path ? "#4a3aff" : "#444",
                fontWeight: location.pathname === item.path ? 700 : 500,
                textTransform: "none",
                "&:hover": { color: "#4a3aff" },
              }}
            >
              {item.label}
            </Button>
          ))}

          {/* ---------- Sign Up button ---------- */}
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            sx={{
              background: "linear-gradient(45deg, #4a3aff, #8b5cf6)",
              borderRadius: "25px",
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "0px 2px 6px rgba(74,58,255,0.3)",
              "&:hover": {
                background: "linear-gradient(45deg, #3a2fd8, #7c3aed)",
              },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
