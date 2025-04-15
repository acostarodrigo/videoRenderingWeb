// HomePage.jsx
import React from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";

import heroBanner from "images/hero-banner.jpg";
import { TopBar } from "components/TopBar";
import { NetworkStats } from "views/NetworkStats";
import { TopPerformers } from "views/TopPerformers";
import { RenderTimeEstimator } from "views/RenderTimeEstimator";
import { Footer } from "views/Footer";
import { SubscribeForm } from "views/SubscribeForm";

export const Home = () => {
  const theme = useTheme();

  return (
    <Box>
      <TopBar />
      {/* Hero Section with Background Image */}
      <Box
        sx={{
          py: 12,
          px: 2,
          textAlign: "center",
          color: "#fff",
          backgroundImage: `url(${heroBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Decentralized Video Rendering
        </Typography>
        <Typography variant="h5">
          Render frames. Earn crypto. Compete fairly.
        </Typography>
      </Box>

      {/* Description Section */}
      <Box
        sx={{ px: 4, py: 8, maxWidth: 900, mx: "auto", textAlign: "center" }}
      >
        <Typography variant="h4" gutterBottom>
          What We’re Building
        </Typography>
        <Typography variant="body1" paragraph>
          A decentralized rendering network that rewards speed and honesty.
        </Typography>
        <Typography variant="body1" paragraph>
          Anyone with a GPU can compete to render frames of animation and earn
          crypto. The fastest and most honest nodes win rewards.
        </Typography>
        <Typography variant="body1">
          Transparency, speed, and decentralization—at the core of every pixel.
        </Typography>
      </Box>

      <NetworkStats />

      <Box marginY={5} padding={10} bgcolor={theme.palette.primary.light}>
        <TopPerformers />
      </Box>

      <Box marginY={5} padding={10} bgcolor={theme.palette.secondary.main}>
        <RenderTimeEstimator />
      </Box>

      <SubscribeForm />
      <Footer />
    </Box>
  );
};
