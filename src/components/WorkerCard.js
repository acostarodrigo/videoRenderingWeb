import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, LinearProgress, Typography } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { shortenAddress } from "utils/misc";
import { WorkerLog } from "./WorkerLog";
import BigNumber from "bignumber.js";
import { VideoRenderingStargateClient } from "cosmosClient/dist/stargateClient";

export const WorkerCard = ({ worker, result, open, setOpen, threadId }) => {
  console.log("====================================");
  console.log(result);
  console.log("====================================");
  const [reputation, setReputation] = useState({});
  const getReputation = async () => {
    const cosmosClient = await VideoRenderingStargateClient.connect(
      process.env.RPC_URL
    );
    const queryClient = cosmosClient.videoRenderingQueryClient.videoRendering;
    const response = await queryClient.GetWorker(worker);
    console.log("reputation", response);
    setReputation(response.reputation);
  };
  useEffect(() => {
    getReputation();
  }, []);

  const getAction = () => {
    if (!result) return <></>;
    const [action, files] = result;
    switch (action) {
      case "working":
        return (
          <Grid
            container
            direction={"row"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            // spacing={2}
            // marginLeft={2}
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
            justifyContent={"flex-start"}
            alignItems={"center"}
            // spacing={2}
            // marginLeft={2}
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
            justifyContent={"flex-start"}
            alignItems={"center"}
            // spacing={2}
            // marginLeft={2}
          >
            <Grid item>
              <EmojiEventsIcon color="success" />
            </Grid>
            <Grid item>
              <Typography>Winner - {files} files</Typography>
            </Grid>
          </Grid>
        );
      default:
        return (
          <Grid
            container
            direction={"row"}
            // justifyContent={"flex-start"}
            // alignItems={"center"}
          >
            <Grid item>
              <CheckCircleOutlineIcon />
            </Grid>
            <Grid item>
              <Typography>Verification completed - {files} files</Typography>
            </Grid>
          </Grid>
        );
    }
  };

  return (
    <>
      <Grid
        container
        direction={"row"}
        // justifyContent={"space-between"}
        // alignItems={"center"}
        spacing={4}
      >
        <Grid item>
          Worker: <b>{shortenAddress(worker)}</b>
        </Grid>
        <Grid item justifyContent={"flex-start"}>
          {getAction()}
        </Grid>
        <Grid item justifyContent={"flex-end"}>
          $ Total Winnings:{" "}
          {BigNumber(reputation.winnings?.amount || 0)
            .dividedBy(1e6)
            .toFormat(3)}
        </Grid>
      </Grid>
      {open && (
        <WorkerLog
          worker={worker}
          open={open}
          setOpen={setOpen}
          threadId={threadId}
        />
      )}
    </>
  );
};

WorkerCard.propTypes = {
  worker: PropTypes.object.isRequired,
  action: PropTypes.oneOf("working, verifying, winner"),
};
