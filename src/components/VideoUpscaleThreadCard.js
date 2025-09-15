import {
  Box,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { WorkerCard } from "./WorkerCard";

export const VideoUpscaleThreadCard = ({ thread }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const calculateAction = (worker) => {
    if (thread.solution && thread.solution.proposedBy == worker) {
      return ["winner", thread.solution.frames.length];
    }

    if (!thread.solution) return ["working", 0];

    if (
      thread.validations &&
      thread.validations.length > 0 &&
      !thread.completed
    ) {
      for (const validation of thread.validations) {
        if (validation.validator == worker) return ["verifying", 0];
      }
    }

    if (
      thread.validations &&
      thread.validations.length > 0 &&
      thread.completed
    ) {
      for (const validation of thread.validations) {
        if (validation.validator == worker)
          return ["Verified", validation.frames?.length || 0];
      }
    }
  };

  return (
    <Grid
      container
      direction={"column"}
      alignItems={"flex-start"}
      justifyContent={"center"}
    >
      <Grid item xs={12}>
        <Box display={"flex"} alignItems={"center"}>
          <Typography variant="body">
            From frame {thread.startFrame.low} to {thread.endFrame.low}
          </Typography>
          {!thread.completed ? (
            <CircularProgress size={20} style={{ marginLeft: 10 }} />
          ) : (
            <CheckCircleOutlineIcon size={20} color="success" />
          )}
        </Box>
      </Grid>
      <Grid item>
        <List>
          {thread.workers.map((worker, index) => (
            <ListItem key={index}>
              <ListItemButton
                onClick={handleClickOpen}
                sx={{ pointerEvents: open ? "none" : "auto" }}
              >
                <ListItemIcon>
                  <EngineeringIcon />
                </ListItemIcon>
                <ListItemText style={{ textAlign: "center", marginRight: 15 }}>
                  <WorkerCard
                    worker={worker}
                    result={calculateAction(worker)}
                    open={open}
                    setOpen={setOpen}
                    threadId={thread.threadId}
                  />
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};
