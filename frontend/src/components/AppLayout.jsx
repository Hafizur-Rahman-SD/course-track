import * as React from "react";
import { Container, Box, CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import Navbar from "./Navbar";

const theme = createTheme({
  typography: { fontFamily: ["Inter", "Roboto", "Helvetica", "Arial", "sans-serif"].join(",") },
  shape: { borderRadius: 12 },
});

export default function AppLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>{children}</Box>
      </Container>
    </ThemeProvider>
  );
}
