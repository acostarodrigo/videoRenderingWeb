import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { TopBar } from "components/TopBar";
import { Footer } from "components/Footer";
import { VideoRenderingStargateClient } from "../../cosmosClient/dist/stargateClient";

export const Home = () => {
  const [videoRenderingTask, setVideoRenderingTask] = useState({});
  const getTask = async () => {
    const cosmosClient = await VideoRenderingStargateClient.connect(
      process.env.RPC_URL
    );
    const chainId = await cosmosClient.getChainId();
    console.log("chainId", chainId);
    const queryClient = cosmosClient.videoRenderingQueryClient.videoRendering;
    console.log(queryClient);
    const result = await queryClient.GetVideoRenderingTask(1);
    setVideoRenderingTask(result);
  };
  useEffect(() => {
    getTask();
  }, []);

  return (
    <>
      <Container>
        <TopBar />
        Jasmy task: cid {videoRenderingTask.cid}
        <Footer />
      </Container>
    </>
  );
};
