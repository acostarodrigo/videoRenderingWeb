import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Container,
} from "@mui/material";

import logo from "images/logo.png";

export const TopBar = () => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{ height: 40, width: "auto", mr: 2 }}
            />
            <Typography variant="h6" noWrap sx={{ fontWeight: "bold" }}>
              Janction
            </Typography>
          </Box>

          {/* Navigation Buttons */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button color="primary">How it works</Button>
            <Button color="primary">Join your PC</Button>
            <Button color="primary">Render your animation</Button>
            <Button color="primary">Rendering Explorer</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
