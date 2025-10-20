import * as React from "react";
import AppLayout from "./components/AppLayout";
import { Button, Card, CardContent, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import TimelineIcon from "@mui/icons-material/Timeline";

export default function App() {
  return (
    <AppLayout>
      <Card elevation={1} sx={{ p: 1 }}>
        <CardContent>
          <Stack spacing={2} alignItems="center" textAlign="center">
            <SchoolIcon fontSize="large" />
            <Typography variant="h4" fontWeight={800}>
              Track every course in one place.
            </Typography>
            <Typography color="text.secondary">
              Add courses, notes, certificates—see progress at a glance.
            </Typography>
            <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
              <Button component={Link} to="/signup" variant="contained">Get Started</Button>
              <Button component={Link} to="/login" variant="outlined">Login</Button>
              <Button component={Link} to="/dashboard" startIcon={<TimelineIcon />}>
                Live Demo
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
