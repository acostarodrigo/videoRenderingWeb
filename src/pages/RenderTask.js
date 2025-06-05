import React, { useEffect, useState } from "react";
import { create } from "ipfs-http-client";
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
import {
  hideBackdrop,
  setBackdropMessage,
  showBackdrop,
  showSnackbar,
} from "state/ui";
import { ConnectWalletButton } from "components/ConnectWalletButton";
import { getSigningClient } from "utils/web3";
import { isValidBech32 } from "utils/address";
import { MyTasks } from "components/MyTasks";

export const RenderTask = () => {
  const dispatch = useDispatch();
  const { address } = useSelector((state) => state.blockchain);
  const [file, setFile] = useState(null);
  const [startFrame, setStartFrame] = useState(1);
  const [endFrame, setEndFrame] = useState(250);
  const [workers, setWorkers] = useState(10);
  const [reward, setReward] = useState("");
  const [balance, setBalance] = useState(0);

  const getBalance = async () => {
    const { keplr } = window;
    const [creator, client] = await getSigningClient(keplr);
    const denom = await client.getBalance(creator, "jct");
    setBalance(Number(denom?.amount || 0));
  };
  useEffect(() => {
    if (address) getBalance();
  }, [address]);

  function bytesToMB(b) {
    return (b / 1024 / 1024).toFixed(1);
  }

  async function uploadFile() {
    try {
      // Use a streaming source so the UI thread stays free
      const source = {
        path: file.name,
        content: file.stream(), // <— no blocking read
      };
      const client = create({
        url: process.env.IPFS_NODE,
      });
      const response = await client.add(source, {
        wrapWithDirectory: false, // keep raw CID
        progress: (bytes) =>
          dispatch(setBackdropMessage(`Uploading… ${bytesToMB(bytes)} MB`)),
      });
      return response.cid.toString();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedReward = ethers.parseUnits(reward.toString(), 6);

    if (!file) return;
    // Replace with actual blockchain TX or API logic
    dispatch(showBackdrop());
    dispatch(setBackdropMessage("Uploading file..."));
    const cid = await uploadFile();
    console.log("cid", cid);
    if (!cid) {
      dispatch(
        showSnackbar({
          severity: "error",
          message: "There was an error uploading your file. Please try again.",
        })
      );
      return;
    }
    dispatch(setBackdropMessage("Preparing transaction..."));
    try {
      const { keplr } = window;
      const [creator, client] = await getSigningClient(keplr);

      const isValid = isValidBech32(creator);
      if (!isValid) throw new Error("Address is not valid");

      dispatch(setBackdropMessage("Submitting transaction..."));
      await client.createVideoRenderingTask(
        creator,
        cid,
        startFrame,
        endFrame,
        workers,
        parsedReward,
        "auto"
      );
    } catch (error) {
      console.error("error broadcast", error);
      if (error.message.includes("Account does not exist on chain")) {
        dispatch(
          showSnackbar({
            severity: "warning",
            message:
              "Connected wallet doesn't have any JCT Tokens. Add some and then continue.",
          })
        );
        return;
      }
      if (error.message.includes("Length must be a multiple of 4")) {
        dispatch(
          showSnackbar({
            severity: "success",
            message: "Task created successfully. Rendering will start soon.",
          })
        );
        return;
      }
      dispatch(
        showSnackbar({
          severity: "error",
          message:
            "There was an error submitting your transaction. Please refresh and try again.",
        })
      );
    } finally {
      dispatch(hideBackdrop());
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
                    disabled={balance == 0}
                    fullWidth
                  >
                    Submit Render Task
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Paper>

        {address && <MyTasks />}
      </Container>
      <Footer />
    </>
  );
};
