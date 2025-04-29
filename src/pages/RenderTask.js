import React, { useState } from "react";
import { PinataSDK } from "pinata";
import { ethers } from "ethers";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  Grid,
  InputAdornment,
} from "@mui/material";
import { TopBar } from "components/TopBar";
import { Footer } from "views/Footer";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { hideBackdrop, showBackdrop, showSnackbar } from "state/ui";
import { ConnectWalletButton } from "components/ConnectWalletButton";
import { getSigningClient } from "utils/web3";
import { CreateTaskButton } from "components/CreateTaskButton";

const pinata = new PinataSDK({
  pinataJwt:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhYThhMWExYS05NmE4LTQwNzUtOTA0MS00NDk2ZmNjOWJhMjMiLCJlbWFpbCI6ImFjb3N0YS5yb2RyaWdvNzdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjA3YjIzYmNjZjkxNWE1MTQ4ZWU1Iiwic2NvcGVkS2V5U2VjcmV0IjoiYWNlZGY5ZjUzN2MwNWNlODNlYjljMjQxOWFiMjcyZDBkY2Q3OGZhNmI4N2U2ZjgwZjNkZDNlOWQ5ZjA2NTA5ZiIsImV4cCI6MTc3NzA1MDE3Mn0.ZRkKVBe1lQvkVFj8TIGBY0Ljvmbw0jfzFa0OO1nmkA0",
  pinataGateway: "moccasin-shrill-guppy-218.mypinata.cloud",
});

export const RenderTask = () => {
  const dispatch = useDispatch();
  const { address } = useSelector((state) => state.blockchain);
  const [file, setFile] = useState(null);
  const [startFrame, setStartFrame] = useState(1);
  const [endFrame, setEndFrame] = useState(250);
  const [workers, setWorkers] = useState(10);
  const [reward, setReward] = useState("");

  async function uploadFile() {
    try {
      dispatch(showBackdrop());
      const response = await pinata.upload.file(file);
      console.info("pinata", response);
      return "QmYC32RNLAMPRa8RGWEEHJWMcrnMzJ2Hq8xByupeFPUNtn";
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideBackdrop());
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedReward = ethers.parseUnits(reward.toString(), 6);
    console.log(reward, parsedReward);

    if (!file) return;
    // Replace with actual blockchain TX or API logic
    console.log("Creating task with values:", {
      file,
      startFrame,
      endFrame,
      workers,
      parsedReward,
    });

    const cid = await uploadFile();
    if (!cid) {
      dispatch(
        showSnackbar({
          severity: "error",
          message: "There was an error uploading your file. Please try again.",
        })
      );
      return;
    }

    try {
      const { keplr } = window;
      const [creator, client] = await getSigningClient(keplr);
      const response = await client.createVideoRenderingTask(
        creator,
        cid,
        startFrame,
        endFrame,
        workers,
        "1000000",
        "auto"
      );
    } catch (error) {
      console.error(error);
      if (error.message.includes("Account does not exist on chain")) {
        dispatch(
          showSnackbar({
            severity: "warning",
            message:
              "Connected wallet doesn't have any JCT Tokens. Add some and then continue.",
          })
        );
      }
    }
  };

  return (
    <>
      <TopBar />
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Paper sx={{ p: 4 }} elevation={3}>
          {/* Title & Description */}
          <Typography variant="h4" gutterBottom>
            Create a Render Task
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Upload your Blender animation and define the task parameters.
            Blockchain nodes will compete to render your animation as fast as
            possible. The reward in JCT tokens will be distributed among the
            fastest and most honest workers.
          </Typography>

          <Box padding={5} marginBottom={5}>
            <ConnectWalletButton />
            <CreateTaskButton />
          </Box>
          {/* Form */}
          {address && (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Button variant="contained" component="label">
                    Upload .blend File
                    <input
                      type="file"
                      accept=".blend"
                      hidden
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </Button>
                  {file && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Selected: {file.name}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Start Frame"
                    type="number"
                    value={startFrame}
                    onChange={(e) => setStartFrame(+e.target.value)}
                    required
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="End Frame"
                    type="number"
                    value={endFrame}
                    onChange={(e) => setEndFrame(+e.target.value)}
                    required
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Threads / Workers"
                    type="number"
                    value={workers}
                    onChange={(e) => setWorkers(+e.target.value)}
                    required
                  />
                </Grid>

                <Grid item xs={6}>
                  <NumericFormat
                    customInput={TextField}
                    decimalScale={6}
                    fixedDecimalScale
                    value={reward}
                    valueIsNumericString
                    placeholder="JCT Amount"
                    label="Reward in JCT"
                    required
                    onChange={(e) => setReward(+e.target.value)}
                    type="number"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">JCT</InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                  >
                    Submit Render Task
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Paper>
      </Container>
      <Footer />
    </>
  );
};
