import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  CircularProgress,
  Box,
  Divider,
  Button,
} from "@mui/material";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        setUser(data.session.user);
      }
      setLoading(false);
    };
    checkSession();
  }, []);

  if (loading)
    return (
      <Stack alignItems="center" mt={10}>
        <CircularProgress />
      </Stack>
    );

  if (!user)
    return (
      <>
        <Navbar />
        <Typography align="center" mt={10} variant="h6" color="error">
          ⚠️ No user found <br />
          <span style={{ fontSize: "0.9rem", color: "#666" }}>
            Please login again to see your profile.
          </span>
        </Typography>
      </>
    );

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          background:
            "linear-gradient(135deg, #f9fafb 0%, #eef2ff 100%)",
          p: 2,
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 420,
            borderRadius: 4,
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            p: 2,
            background: "#ffffff",
          }}
        >
          <CardContent>
            <Stack alignItems="center" spacing={2}>
              <Avatar
                sx={{
                  bgcolor: "#4f46e5",
                  width: 80,
                  height: 80,
                  fontSize: "2rem",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                }}
              >
                {user.email[0].toUpperCase()}
              </Avatar>

              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ color: "#1e293b" }}
              >
                {user.email}
              </Typography>

              <Divider sx={{ width: "100%", my: 1.5 }} />

              <Typography
                sx={{
                  fontSize: "0.9rem",
                  color: "#475569",
                  textAlign: "center",
                }}
              >
                <strong>ID:</strong> {user.id.slice(0, 10)}... <br />
                <strong>Joined:</strong>{" "}
                {new Date(user.created_at || Date.now()).toLocaleDateString(
                  "en-GB",
                  { day: "2-digit", month: "short", year: "numeric" }
                )}
              </Typography>

              <Divider sx={{ width: "100%", my: 1.5 }} />

              <Button
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: 3,
                  px: 4,
                  textTransform: "none",
                  fontWeight: 600,
                }}
                onClick={async () => {
                  await supabase.auth.signOut();
                  window.location.href = "/login";
                }}
              >
                Logout
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
