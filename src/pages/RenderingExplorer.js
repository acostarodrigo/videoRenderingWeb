import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Footer } from "views/Footer";
import {
  Box,
  CircularProgress,
  Container,
  Switch,
  Typography,
} from "@mui/material";
import { TopBar } from "components/TopBar";
import VideoRenderingTaskCard from "components/VideoRenderingTaskCard";
import { Link } from "react-router-dom";
import AudioStemTaskCard from "components/AudioStemTaskCard";

export const RenderingExplorer = () => {
  const { tasks } = useSelector((state) => state.videoRendering);
  const { tasks: audioStemTasks } = useSelector((state) => state.audioStem);
  const [hideCompleted, setHideCompleted] = useState(true);
  const [hideCompletedAudioStem, setHideCompletedAudioStem] = useState(true);

  const handleChange = () => {
    setHideCompleted((current) => !current);
  };
  return (
    <>
      <TopBar />
      <Container>
        {/* Description Section */}
        <Box
          sx={{ px: 4, py: 8, maxWidth: 900, mx: "auto", textAlign: "center" }}
        >
          <Typography variant="h4" gutterBottom>
            Render Task Explorer
          </Typography>
          <Typography variant="body1" paragraph>
            View all existing task in real time as they are being rendered
          </Typography>
          <Typography variant="body2" paragraph>
            You can also render videos and earn money by <Link> joining</Link>{" "}
            the blockchain
          </Typography>
        </Box>
        <Box marginTop={4}>
          <Typography variant="h4" textAlign={"center"}>
            Video Rendering
          </Typography>
          {tasks?.length > 0 ? (
            <>
              Hide Completed
              <Switch
                checked={hideCompleted}
                onChange={handleChange}
                defaultChecked
                color="warning"
              />
              {tasks
                .filter((val) =>
                  hideCompleted
                    ? val.completed == false
                    : val.completed == true || val.completed == false
                )
                .map((task, index) => (
                  <VideoRenderingTaskCard
                    task={task}
                    key={index}
                    explorer={true}
                  />
                ))}
            </>
          ) : (
            <Box textAlign={"center"} margin={10} padding={10}>
              <CircularProgress />
            </Box>
          )}
        </Box>
        <Box marginTop={4}>
          <Typography variant="h4" textAlign={"center"}>
            Audio Stem
          </Typography>
          {tasks?.length > 0 ? (
            <>
              Hide Completed
              <Switch
                checked={hideCompletedAudioStem}
                onChange={() =>
                  setHideCompletedAudioStem((current) => !current)
                }
                defaultChecked
                color="success"
              />
              {audioStemTasks
                .filter((val) =>
                  hideCompletedAudioStem
                    ? val.completed == false
                    : val.completed == true || val.completed == false
                )
                .map((task, index) => (
                  <AudioStemTaskCard task={task} key={index} explorer={true} />
                ))}
            </>
          ) : (
            <Box textAlign={"center"} margin={10} padding={10}>
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Container>
      <Footer />
    </>
  );
};
