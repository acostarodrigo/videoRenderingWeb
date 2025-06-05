import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import VideoRenderingTaskCard from "./VideoRenderingTaskCard";
import { Box, CircularProgress, Typography } from "@mui/material";

export const MyTasks = () => {
  const { tasks, loading } = useSelector((state) => state.videoRendering);
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
              No tasks created. Refresh to update.
            </Typography>
          ) : (
            <>
              {myTasks.map((task, index) => (
                <VideoRenderingTaskCard
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
