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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#e3f2fd",
              p: 2,
              borderRadius: 2,
              mb: 2,
            }}
          >
            <Typography variant="body1" sx={{ mr: 1 }}>
              ℹ️
            </Typography>
            <Typography variant="body1" color="text.primary">
              Janction's blockchain is still in development. You can join the
              testnet to help us make it better.
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight="medium" gutterBottom>
            How to Join
          </Typography>

          {[
            {
              title: "1. Prerequisites",
              description: "You will need Go Lang, IPFS and Docker installed:",
              command: `
https://go.dev/doc/install
https://docs.ipfs.tech/install/
https://docs.docker.com/get-docker/
              `,
            },
            {
              title: "2. Build from source",
              description: "Clone Janction's layer 1 node",
              command: `
git clone https://github.com/acostarodrigo/janctionVideoRenderingModule.git videoRendering
git clone https://github.com/acostarodrigo/janctionLayer1Node.git`,
            },
            {
              title: "3. Compile and run",
              description: "Compile the node and joint the testnet",
              command: `
cd janctionLayer1Node
make install
make init
make testnet-add
              `,
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
      <Box textAlign="center" py={4}>
        <Box
          sx={{
            backgroundColor: "#fff3cd",
            color: "#856404",
            p: 2,
            borderRadius: 2,
            mb: 3,
            display: "inline-block",
          }}
        >
          <Typography variant="body1" fontWeight="medium">
            Having troubles? Contact{" "}
            <a
              href="mailto:rodrigo@jasmylab.com"
              style={{ color: "#856404", textDecoration: "underline" }}
            >
              rodrigo@jasmylab.com
            </a>
          </Typography>
        </Box>
      </Box>
      <Footer />
    </>
  );
};
