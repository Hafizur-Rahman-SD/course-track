import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  CircularProgress,
} from "@mui/material";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error) setUser(data.user);
      setLoading(false);
    };
    getUser();
  }, []);

  if (loading)
    return (
      <Stack alignItems="center" mt={10}>
        <CircularProgress />
      </Stack>
    );

  if (!user)
    return (
      <Typography align="center" mt={10}>
        No user found. Please log in.
      </Typography>
    );

  return (
    <>
      <Navbar />
      <Card
        sx={{
          maxWidth: 480,
          mx: "auto",
          mt: 6,
          p: 2,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          borderRadius: "16px",
        }}
      >
        <CardContent>
          <Stack alignItems="center" spacing={2}>
            <Avatar
              sx={{
                width: 90,
                height: 90,
                bgcolor: "#1976d2",
                fontSize: 32,
                fontWeight: "bold",
              }}
            >
              {user.email[0].toUpperCase()}
            </Avatar>
            <Typography variant="h6" fontWeight={700}>
              {user.email}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              ID: {user.id.slice(0, 10)}...
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Joined:{" "}
              {new Date(user.created_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
