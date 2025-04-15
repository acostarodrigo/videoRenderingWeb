import React from "react";
import { Box, Button, Container, Grid, Typography, Paper } from "@mui/material";
// import { motion } from "framer-motion";
import how_1 from "../images/how_it_works_step_1.png";
import how_2 from "../images/how_it_works_step_2.png";
import how_3 from "../images/how_it_works_step_3.png";
import how_4 from "../images/how_it_works_step_4.png";
import { TopBar } from "components/TopBar";
import { Footer } from "views/Footer";
import { Link } from "react-router-dom";

const steps = [
  {
    title: "1. Submit Your Task",
    text: "Upload a .blend file, define frame range, threads, and reward. Task is broadcast to all rendering nodes.",
  },
  {
    title: "2. Nodes Compete",
    text: "Worker nodes render frames. Fastest node proposes a solution including output hashes and file proofs.",
  },
  {
    title: "3. Validators Step In",
    text: "Other nodes verify results by re-rendering and matching. They submit cryptographic signatures.",
  },
  {
    title: "4. Rewards Are Distributed",
    text: "Winner gets the main reward. Honest validators earn partial rewards. Dishonest validators are slashed.",
  },
];

export const HowItWorks = () => {
  return (
    <>
      <TopBar />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Hero Section */}
        <Box textAlign="center" mb={10}>
          <Typography variant="h2" fontWeight={700} gutterBottom>
            The Power of Decentralized Rendering
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={4}>
            Upload your Blender animation. Let GPU nodes around the world race
            to render it. Pay only for verified results.
          </Typography>
          <Button
            variant="contained"
            size="large"
            LinkComponent={Link}
            to={"/render"}
          >
            Create a Render Task
          </Button>
        </Box>

        {/* How It Works Section */}
        <Grid container spacing={4} mb={10}>
          {steps.map((step, i) => (
            <Grid item xs={12} md={6} lg={3} key={i}>
              <Paper elevation={3} sx={{ p: 4, height: "100%" }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.text}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Race Graphic Section */}
        <Box textAlign="center" mb={10}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            1. Submit your task
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            You submit your .blender animation and define the frames to render
            and in how many threads to split it. <br />
            The more threads, the more computers rendering in parallel you will
            get, reducing the rendering time. <br />
            <br />
            Potentially thousands of computers will try to gain a spot in
            rendering your blender animation. <br />
            <br />
            Within seconds, the bucket is filled with workers and they start
            rendering as fast as they can!
          </Typography>

          <img src={how_1} alt="step 1" width={"50%"} />
        </Box>

        {/* Validation & Rewards Graphic Section */}
        <Box textAlign="center" mb={10}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Nodes compete
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Each node will start rendering their assigned frames as fast as
            possible. <br />
            Competing against other nodes who have the same set of frames to
            render all of them first!
            <br />
            The fastest node will announce victory and submit proof of
            completion without revealing the solution.
          </Typography>
          <img src={how_2} alt="step 2" width={"50%"} />
        </Box>

        <Box textAlign="center" mb={10}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Validators Step in
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Slower nodes that didn't win will start their validation process.{" "}
            <br />
            Which includes hashing and cryptographically signing those hashes.
            <br />
            Validations are submitted to the blockchain to make sure the
            solution is valid and rendered files are what was expected.
          </Typography>
          <img src={how_3} alt="step 3" width={"50%"} />
        </Box>

        <Box textAlign="center" mb={10}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Rewards Are Distributed
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Task reward is distributed between the winning node, which rendered
            first all requested frames, and the validators.
            <br />
            You get your animation rendered as fast as possible thanks to the
            winning nodes, and with total confidence that files are ok, thanks
            to the validators!
          </Typography>
          <img src={how_4} alt="step 4" width={"50%"} />
        </Box>

        {/* Final CTA */}
        <Box textAlign="center">
          <Button
            variant="contained"
            size="large"
            LinkComponent={Link}
            to={"/join"}
          >
            Join the Network
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
};
