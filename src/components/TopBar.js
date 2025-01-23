import React from "react";
import logo from "images/logo.png";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ConnectWalletButton } from "./ConnectWalletButton";

export const TopBar = () => {
  return (
    <Grid
      container
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      spacing={2}
      marginY={5}
    >
      <Grid item>
        <Button
          component={Link}
          href="/"
          variant="text"
          disableElevation
          disableRipple
        >
          <img src={logo} width={50} alt="Ante Test" />
        </Button>
      </Grid>
      <Grid item>
        <Typography variant="h4">Janction Video Rendering</Typography>
      </Grid>
      <Grid item>
        <ConnectWalletButton />
      </Grid>
    </Grid>
  );
};
