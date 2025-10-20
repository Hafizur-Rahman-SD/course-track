import * as React from "react";
import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabaseClient";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // define + call inside effect to avoid lint nags
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) return navigate("/login");
      setUser(data.session.user);
    };
    getUser();
  }, [navigate]);

  return (
    <AppLayout>
      <Typography variant="h5" fontWeight={800} mb={2}>
        Welcome{user ? `, ${user.email}` : ""}
      </Typography>

      <Grid container spacing={2}>
        {["Total Courses", "In-Progress", "Completed"].map((title, i) => (
          <Grid item xs={12} sm={4} key={i}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
                <Typography variant="h4" fontWeight={800}>0</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button sx={{ mt: 3 }} variant="contained" onClick={() => alert("Next: Add Course form")}>
        + Add New Course
      </Button>
    </AppLayout>
  );
}
