import React from "react";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";

export default function Dashboard() {
  return (
    <Card sx={{ maxWidth: 1000, mx: "auto", mt: 6, p: 2 }}>
      <CardContent>
        <Typography variant="h5" fontWeight={700}>
          My Courses
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Courses
                </Typography>
                <Typography variant="h4">0</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  In Progress
                </Typography>
                <Typography variant="h4">0</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Completed
                </Typography>
                <Typography variant="h4">0</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Button variant="contained" sx={{ mt: 3 }}>
          + Add New Course
        </Button>
      </CardContent>
    </Card>
  );
}
