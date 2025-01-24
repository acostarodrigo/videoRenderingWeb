import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hideBackdrop, showBackdrop, showSnackbar } from "state/ui";
import { shortenAddress } from "utils/misc";
import { getSigningClient } from "utils/web3";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const CreateTaskButton = () => {
  const { address } = useSelector((state) => state.blockchain);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  const handleCreateTask = async () => {
    const { keplr } = window;
    if (!keplr) {
      alert("You need to install Keplr");
      throw new Error("You need to install Keplr");
    }

    try {
      dispatch(showBackdrop());
      setOpen(false);
      const [creator, client] = await getSigningClient(keplr);
      const response = await client.createVideoRenderingTask(
        creator,
        "QmYC32RNLAMPRa8RGWEEHJWMcrnMzJ2Hq8xByupeFPUNtn",
        1,
        4,
        2,
        100,
        "auto"
      );
      dispatch(
        showSnackbar({
          severity: "success",
          message: "Task created succesffuly",
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar({
          severity: "error",
          message: "There was an issue creating your task. Please try again.",
        })
      );
    } finally {
      dispatch(hideBackdrop());
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid
        container
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="info"
            onClick={() => setOpen(true)}
          >
            Create Video Rendering task
          </Button>
        </Grid>
        <Grid item xs={12} textAlign={"center"}>
          <Card elevation={4}>
            <CardContent>
              <Typography variant="body1">Connected to Janction</Typography>
              <Typography variant="body2">{shortenAddress(address)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Dialog open={open}>
        <DialogTitle>Render your animation on blockchain!</DialogTitle>
        <DialogContent>
          <FormControl>
            <Grid container direction={"column"} spacing={2}>
              <Grid item xs={12}>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  fullWidth
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload your animation
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => console.log(event.target.files)}
                    multiple
                  />
                </Button>
              </Grid>
              <Grid item xs={12} width={"100%"}>
                <TextField label="Start frame" variant="standard" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="End frame" variant="standard" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Amount of nodes"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Reward" variant="standard" fullWidth />
              </Grid>
            </Grid>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleCancel} fullWidth>
            Cancel
          </Button>
          <Button
            variant="contained"
            fullWidth
            color="error"
            onClick={handleCreateTask}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
