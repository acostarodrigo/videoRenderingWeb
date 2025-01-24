import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { TopBar } from "components/TopBar";
import { Footer } from "components/Footer";
import { useSelector } from "react-redux";
import VideoRenderingTaskCard from "components/VideoRenderingTaskCard";
import { getVideoRenderingTasks } from "utils/videoRendering";

export const Home = () => {
  const { tasks } = useSelector((state) => state.videoRendering);

  useEffect(() => {
    getVideoRenderingTasks();
  }, []);

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

        <Footer />
      </Container>
    </>
  );
};
