import * as React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) navigate("/login");
      else setUser(data.session.user);
    };
    getUser();
  }, [navigate]);

  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mt: 6, p: 3 }}>
      <CardContent>
        <Typography variant="h5" fontWeight={700}>Welcome, {user?.email}</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>You’re now logged in 🎉</Typography>
        <Button sx={{ mt: 3 }} variant="contained" onClick={() => alert("Next: Add course form here")}>
          + Add New Course
        </Button>
      </CardContent>
    </Card>
  );
}
