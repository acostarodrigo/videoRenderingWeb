import React from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import { TopBar } from "components/TopBar";
import { Footer } from "views/Footer";

export const Join = () => {
  return (
    <>
      <TopBar />
      <Box sx={{ p: 4, maxWidth: "1000px", mx: "auto" }}>
        {/* Hero Section */}
        <Box textAlign="center" mb={8}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Join the Janction Network
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={3}>
            Become part of the decentralized rendering revolution. By joining
            the network, you can accept rendering tasks and start earning money
            by rendering frames or validating them.
          </Typography>
        </Box>

        {/* Instructions Section */}
        <Box mb={8}>
          <Typography variant="h4" fontWeight="medium" gutterBottom>
            How to Join
          </Typography>

          {[
            {
              title: "1. Clone the Repository",
              description:
                "Clone our GitHub repository containing the node setup and rendering tools:",
              command: "git clone https://github.com/janction-network/node",
            },
            {
              title: "2. Install IPFS",
              description:
                "IPFS is required to share and fetch frame files across the network.",
              command: "https://docs.ipfs.tech/install/",
            },
            {
              title: "3. Install Docker",
              description:
                "Docker is used to run the rendering environment in an isolated container.",
              command: "https://docs.docker.com/get-docker/",
            },
            {
              title: "4. Start the Node",
              description:
                "Follow the README instructions to launch your Janction node and register as a worker.",
              command: "cd node\nnpm install\nnpm run start",
            },
          ].map((step, index) => (
            <Card key={index} sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {step.title}
                </Typography>
                <Typography color="text.secondary" mb={2}>
                  {step.description}
                </Typography>
                <Box
                  component="pre"
                  sx={{
                    backgroundColor: "#f5f5f5",
                    p: 2,
                    borderRadius: 1,
                    overflow: "auto",
                  }}
                >
                  <code>{step.command}</code>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
      <Footer />
    </>
  );
};
