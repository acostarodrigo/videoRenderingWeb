import { Backdrop, CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export const CustomBackdrop = () => {
  const { showBackdrop, backdropMessage } = useSelector((state) => state.ui);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={showBackdrop}
    >
      <Grid
        container
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={2}
      >
        <Grid>
          <CircularProgress color="inherit" />
        </Grid>
        {backdropMessage && (
          <Grid>
            <Typography variant="body">{backdropMessage}</Typography>
          </Grid>
        )}
      </Grid>
    </Backdrop>
  );
};
