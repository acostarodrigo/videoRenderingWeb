import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, LinearProgress, Typography } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { shortenAddress } from "utils/misc";
import { isMobile } from "react-device-detect";
import { getWorkerLogs } from "utils/videoRendering";
import { WorkerLog } from "./WorkerLog";
export const WorkerCard = ({ worker, action, open, setOpen, threadId }) => {
  const getAction = () => {
    switch (action) {
      case "working":
        return (
          <Grid
            container
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={2}
            marginLeft={2}
          >
            <Grid item>
              Working
              <LinearProgress />
            </Grid>
          </Grid>
        );
      case "verifying":
        return (
          <Grid
            container
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={2}
            marginLeft={2}
          >
            <Grid item>
              <LinearProgress color="success" />
            </Grid>
            <Grid item>
              <Typography>Verifying</Typography>
            </Grid>
          </Grid>
        );
      case "winner":
        return (
          <Grid
            container
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={2}
            marginLeft={2}
          >
            <Grid item>
              <EmojiEventsIcon color="success" />
            </Grid>
            <Grid item>
              <Typography>Winner</Typography>
            </Grid>
          </Grid>
        );
      default:
        return (
          <Grid
            container
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={2}
            marginLeft={2}
          >
            <Grid item>
              <CheckCircleOutlineIcon />
            </Grid>
            <Grid item>
              <Typography>Verification completed</Typography>
            </Grid>
            {open && (
              <WorkerLog
                worker={worker}
                open={open}
                setOpen={setOpen}
                threadId={threadId}
              />
            )}
          </Grid>
        );
    }
  };

  return (
    <>
      <Grid container direction={"row"}>
        <Grid item>Worker {isMobile ? shortenAddress(worker) : worker}</Grid>
        <Grid>{getAction()}</Grid>
      </Grid>
    </>
  );
};

WorkerCard.propTypes = {
  worker: PropTypes.object.isRequired,
  action: PropTypes.oneOf("working, verifying, winner"),
};
