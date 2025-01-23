import React, { useEffect, useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import { TopBar } from "components/TopBar";
import { Footer } from "components/Footer";
import { getSigningClient } from "utils/web3";
import { useSelector } from "react-redux";
import VideoRenderingTaskCard from "components/VideoRenderingTaskCard";
import { getVideoRenderingTasks } from "utils/videoRendering";

export const Home = () => {
  const { tasks } = useSelector((state) => state.videoRendering);

  useEffect(() => {
    getVideoRenderingTasks();
  }, []);

  const handleCreateTask = async () => {
    const { keplr } = window;
    if (!keplr) {
      alert("You need to install Keplr");
      throw new Error("You need to install Keplr");
    }
    const [creator, client] = await getSigningClient(keplr);
    console.log("====================================");
    console.log(creator, client);
    console.log("====================================");
    const response = await client.createVideoRenderingTask(
      creator,
      "QmYC32RNLAMPRa8RGWEEHJWMcrnMzJ2Hq8xByupeFPUNtn",
      1,
      4,
      2,
      100,
      "auto"
    );

    console.log("====================================");
    console.log("response", response);
    console.log("====================================");
  };

  return (
    <>
      <Container>
        <TopBar />
        {tasks?.length > 0 ? (
          <>
            {tasks.map((task, index) => (
              <VideoRenderingTaskCard task={task} key={index} />
            ))}
          </>
        ) : (
          <Typography variant="h5"> No tasks available</Typography>
        )}

        <Button onClick={handleCreateTask}>Create task</Button>
        <Footer />
      </Container>
    </>
  );
};
