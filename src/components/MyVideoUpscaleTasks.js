import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, CircularProgress, Typography } from "@mui/material";
import VideoUpscaleTaskCard from "./VideoUpscaleTaskCard";

export const MyVideoUpscaleTasks = () => {
  const { tasks, loading } = useSelector((state) => state.videoUpscale);
  const { address } = useSelector((state) => state.blockchain);
  const [myTasks, setMyTasks] = useState([]);

  useEffect(() => {
    if (!address) return;
    if (tasks.length == 0) return;
    setMyTasks(tasks.filter((task) => task.requester == address));
  }, [tasks, address]);

  return (
    <>
      <Typography variant="h4" textAlign={"center"} marginY={5}>
        My Tasks
      </Typography>
      {loading ? (
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {myTasks.length == 0 ? (
            <Typography variant="body" textAlign={"center"}>
              You don't have any tasks.
            </Typography>
          ) : (
            <>
              {myTasks.map((task, index) => (
                <VideoUpscaleTaskCard
                  task={task}
                  key={index}
                  explorer={false}
                />
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};
