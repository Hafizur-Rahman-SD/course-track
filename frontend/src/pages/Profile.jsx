import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, Stack, Avatar, Button } from "@mui/material";
import { supabase } from "../lib/supabaseClient";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };
    getUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <Typography variant="h6" color="text.secondary">
          Please log in to view your profile.
        </Typography>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "85vh",
          background: "linear-gradient(135deg, #f3e8ff, #e0f2fe)",
        }}
      >
        <Card
          sx={{
            width: 400,
            borderRadius: 4,
            boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
            p: 3,
            background: "white",
          }}
        >
          <CardContent>
            <Stack spacing={2} alignItems="center" textAlign="center">
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "#7c3aed",
                  fontSize: "2rem",
                }}
              >
                {user.email.charAt(0).toUpperCase()}
              </Avatar>

              <Typography variant="h5" fontWeight={700}>
                {user.user_metadata?.full_name || "User"}
              </Typography>

              <Typography color="text.secondary">{user.email}</Typography>

              <Typography variant="body2" sx={{ mt: 1 }}>
                Joined on:{" "}
                <b>{new Date(user.created_at || Date.now()).toDateString()}</b>
              </Typography>

              <Button
                variant="contained"
                color="error"
                sx={{ mt: 2 }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
