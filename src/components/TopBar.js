import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Container,
  Grid,
} from "@mui/material";

import logo from "images/logo.png";
import { Link } from "react-router-dom";

export const TopBar = () => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Box
            sx={{ display: "flex", alignItems: "center" }}
            component={Link}
            to={"/"}
            style={{ textDecoration: "none" }}
          >
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
          <Grid
            container
            justifyContent={"flex-end"}
            alignItems={"center"}
            spacing={{ xs: 0, md: 2 }}
          >
            <Grid item xs={12} md={1}>
              <Button color="primary" component={Link} to={"/"}>
                Home
              </Button>
            </Grid>
            <Grid item xs={12} md={1}>
              <Button color="primary" component={Link} to={"/how"}>
                How it works
              </Button>
            </Grid>
            <Grid item xs={12} md={1}>
              <Button color="primary" component={Link} to={"/join"}>
                Join your PC
              </Button>
            </Grid>
            <Grid item xs={12} md={1}>
              <Button color="primary" component={Link} to={"/faucet"}>
                Faucet
              </Button>
            </Grid>
            <Grid item xs={12} md={1}>
              <Button color="primary" component={Link} to={"/render"}>
                Render your animation
              </Button>
            </Grid>
            <Grid item xs={12} md={1}>
              <Button color="primary" component={Link} to={"/audio-stem"}>
                Audio Stem
              </Button>
            </Grid>
            <Grid item xs={12} md={1}>
              <Button color="primary" component={Link} to={"/video-upscale"}>
                Video Upscale
              </Button>
            </Grid>
            <Grid item xs={12} md={1}>
              <Button color="primary" component={Link} to={"/explorer"}>
                Task Explorer
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
