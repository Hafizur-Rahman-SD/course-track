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
          No user found 😞<br />
          <span style={{ fontSize: "0.9rem", color: "#666" }}>
            Please login again to see your profile.
          </span>
        </Typography>
      </>
    );

  return (
    <>
      <Navbar />
      <Card className="profile-card">
        <CardContent>
          <Stack alignItems="center" spacing={2}>
            <Avatar className="profile-avatar">
              {user.email[0].toUpperCase()}
            </Avatar>
            <Typography variant="h6" className="profile-email">
              {user.email}
            </Typography>
            <Typography className="profile-meta">
              ID: {user.id.slice(0, 10)}...
            </Typography>
            <Typography className="profile-meta">
              Joined:{" "}
              {new Date(user.created_at || Date.now()).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
