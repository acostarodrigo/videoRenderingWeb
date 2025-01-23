import React, { useEffect, useState } from "react";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import { Button, Container } from "@mui/material";
import { TopBar } from "components/TopBar";
import { Footer } from "components/Footer";
import { VideoRenderingStargateClient } from "../../cosmosClient/dist/stargateClient";
import { getSigningClient } from "utils/web3";

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
        Jasmy task: cid {videoRenderingTask.cid}
        <Button onClick={handleCreateTask}>Create task</Button>
        <Footer />
      </Container>
    </>
  );
};
