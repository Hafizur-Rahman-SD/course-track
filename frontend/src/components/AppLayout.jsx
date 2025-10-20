import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import Navbar from "./Navbar";

const theme = createTheme({
  shape: { borderRadius: 14 },
  typography: { fontFamily: ["Inter", "Roboto", "Helvetica", "Arial", "sans-serif"].join(",") },
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
