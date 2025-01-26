import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { WorkerCard } from "./WorkerCard";

export const VideoRenderingThreadCard = ({ thread }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const calculateAction = (worker) => {
    if (thread.solution && thread.solution.proposedBy == worker) {
      return "winner";
    }

    if (!thread.solution) return "working";

    if (
      thread.validations &&
      thread.validations.length > 0 &&
      !thread.completed
    ) {
      for (const validation of thread.validations) {
        if (validation.validator == worker) return "verifying";
      }
    }

    if (
      thread.validations &&
      thread.validations.length > 0 &&
      thread.completed
    ) {
      for (const validation of thread.validations) {
        if (validation.validator == worker) return "Verified";
      }
    }
  };

  return (
    <Grid
      container
      direction={"column"}
      alignItems={"flex-start"}
      justifyContent={"center"}
      width={"100%"}
    >
      <Grid item xs={12}>
        <Box display={"flex"} alignItems={"center"}>
          <Typography variant="body">
            From frame {thread.startFrame} to {thread.endFrame}
          </Typography>
          {!thread.completed ? (
            <CircularProgress size={20} style={{ marginLeft: 10 }} />
          ) : (
            <CheckCircleOutlineIcon size={20} color="success" />
          )}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <List style={{ width: "100%" }}>
          {thread.workers.map((worker, index) => (
            <ListItem key={index}>
              <ListItemButton onClick={handleClickOpen}>
                <ListItemIcon>
                  <EngineeringIcon />
                </ListItemIcon>
                <ListItemText style={{ textAlign: "center", marginRight: 15 }}>
                  <WorkerCard
                    worker={worker}
                    action={calculateAction(worker)}
                  />
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Dialog open={open}>
        <DialogTitle>Logs for Worker</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography variant="body">
            {`IPFS Downloading CID QmYC32RNLAMPRa8RGWEEHJWMcrnMzJ2Hq8xByupeFPUNtn
            Download completed successfully
            Fra:1 Mem:240.33M (Peak 240.33M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.009
Fra:1 Mem:240.40M (Peak 240.40M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.010
Fra:1 Mem:240.45M (Peak 240.45M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.012
Fra:1 Mem:240.52M (Peak 240.52M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.013
Fra:1 Mem:240.62M (Peak 240.62M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.015
Fra:1 Mem:240.63M (Peak 240.63M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.016
Fra:1 Mem:240.63M (Peak 240.63M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.019
Fra:1 Mem:240.68M (Peak 240.68M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Curve.026
Fra:1 Mem:240.77M (Peak 240.77M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.020
Fra:1 Mem:240.77M (Peak 240.77M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.021
Fra:1 Mem:240.87M (Peak 240.87M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Curve.025
Fra:1 Mem:240.88M (Peak 240.88M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.023
Fra:1 Mem:241.14M (Peak 241.14M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.028
Fra:1 Mem:241.15M (Peak 241.15M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.030
Fra:1 Mem:241.30M (Peak 241.30M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.031
Fra:1 Mem:241.38M (Peak 241.38M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.032
Fra:1 Mem:241.48M (Peak 241.48M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.034
Fra:1 Mem:241.52M (Peak 241.52M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.036
Fra:1 Mem:241.63M (Peak 241.63M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.027
Fra:1 Mem:241.68M (Peak 241.68M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.037
Fra:1 Mem:241.70M (Peak 241.70M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.038
Fra:1 Mem:241.80M (Peak 241.80M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.039
Fra:1 Mem:241.85M (Peak 241.85M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.040
Fra:1 Mem:242.03M (Peak 242.03M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.041
Fra:1 Mem:242.11M (Peak 242.11M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Curve.024
Fra:1 Mem:242.34M (Peak 242.34M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Curve.023
Fra:1 Mem:242.34M (Peak 242.34M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Curve.022
Fra:1 Mem:242.38M (Peak 242.38M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Curve.021
Fra:1 Mem:242.50M (Peak 242.50M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Curve.020
Fra:1 Mem:242.50M (Peak 242.50M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Curve.019
Fra:1 Mem:242.51M (Peak 242.51M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Curve.018
Fra:1 Mem:242.51M (Peak 242.51M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Curve.017
Fra:1 Mem:242.51M (Peak 242.51M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Curve.016
Fra:1 Mem:242.54M (Peak 242.54M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Curve.015
Fra:1 Mem:242.54M (Peak 242.54M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Curve.014
Fra:1 Mem:242.54M (Peak 242.54M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Curve.013
Fra:1 Mem:242.58M (Peak 242.58M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Initializing
Fra:1 Mem:229.02M (Peak 242.58M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Waiting for render to start
Fra:1 Mem:229.02M (Peak 242.58M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Loading render kernels (may take a few minutes the first time)
Fra:1 Mem:229.02M (Peak 242.58M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Updating Scene
Fra:1 Mem:229.02M (Peak 242.58M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Updating Shaders
Fra:1 Mem:229.11M (Peak 242.58M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Updating Procedurals
Fra:1 Mem:229.11M (Peak 242.58M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Updating Background
Fra:1 Mem:229.11M (Peak 242.58M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Updating Camera
Fra:1 Mem:229.11M (Peak 242.58M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Updating Meshes Flags
Fra:1 Mem:229.11M (Peak 242.58M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Updating Objects
Fra:1 Mem:229.11M (Peak 242.58M) | Time:00:00.03 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Updating Objects | Copying Transformations to device
Fra:1 Mem:229.13M (Peak 242.58M) | Time:00:00.03 | Mem:0.03M, Peak:0.03M | Scene, Animation Layer | Updating Objects | Applying Static Transformations
Fra:1 Mem:229.13M (Peak 242.58M) | Time:00:00.03 | Mem:0.03M, Peak:0.03M | Scene, Animation Layer | Updating Particle Systems
Fra:1 Mem:229.13M (Peak 242.58M) | Time:00:00.03 | Mem:0.03M, Peak:0.03M | Scene, Animation Layer | Updating Particle Systems | Copying Particles to device
Fra:1 Mem:229.13M (Peak 242.58M) | Time:00:00.03 | Mem:0.03M, Peak:0.03M | Scene, Animation Layer | Updating Meshes
Fra:1 Mem:231.54M (Peak 242.58M) | Time:00:00.04 | Mem:0.03M, Peak:0.03M | Scene, Animation Layer | Updating Mesh | Computing attributes
Fra:1 Mem:231.55M (Peak 242.58M) | Time:00:00.04 | Mem:0.03M, Peak:0.03M | Scene, Animation Layer | Updating Mesh | Copying Attributes to device
Fra:1 Mem:231.54M (Peak 242.58M) | Time:00:00.04 | Mem:0.03M, Peak:0.03M | Scene, Animation Layer | Updating Scene BVH | Building
Fra:1 Mem:231.54M (Peak 242.58M) | Time:00:00.04 | Mem:0.03M, Peak:0.03M | Scene, Animation Layer | Updating Scene BVH | Building BVH
Fra:1 Mem:240.57M (Peak 242.58M) | Time:00:00.07 | Mem:0.03M, Peak:0.03M | Scene, Animation Layer | Updating Scene BVH | Packing BVH triangles and strands
Fra:1 Mem:241.17M (Peak 242.58M) | Time:00:00.07 | Mem:0.03M, Peak:0.03M | Scene, Animation Layer | Updating Scene BVH | Packing BVH nodes
Fra:1 Mem:240.79M (Peak 242.94M) | Time:00:00.08 | Mem:0.03M, Peak:0.03M | Scene, Animation Layer | Updating Scene BVH | Copying BVH to device
Fra:1 Mem:240.79M (Peak 242.94M) | Time:00:00.08 | Mem:4.65M, Peak:4.65M | Scene, Animation Layer | Updating Mesh | Computing normals
Fra:1 Mem:246.26M (Peak 246.26M) | Time:00:00.08 | Mem:4.65M, Peak:4.65M | Scene, Animation Layer | Updating Mesh | Copying Mesh to device
Fra:1 Mem:246.26M (Peak 246.26M) | Time:00:00.08 | Mem:10.12M, Peak:10.12M | Scene, Animation Layer | Updating Objects Flags
Fra:1 Mem:246.26M (Peak 246.26M) | Time:00:00.08 | Mem:10.12M, Peak:10.12M | Scene, Animation Layer | Updating Primitive Offsets
Fra:1 Mem:246.26M (Peak 246.26M) | Time:00:00.08 | Mem:10.12M, Peak:10.12M | Scene, Animation Layer | Updating Images
Fra:1 Mem:246.26M (Peak 246.26M) | Time:00:00.08 | Mem:10.12M, Peak:10.12M | Scene, Animation Layer | Updating Camera Volume
Fra:1 Mem:246.26M (Peak 246.26M) | Time:00:00.08 | Mem:10.12M, Peak:10.12M | Scene, Animation Layer | Updating Lookup Tables
Fra:1 Mem:246.26M (Peak 246.26M) | Time:00:00.08 | Mem:10.20M, Peak:10.20M | Scene, Animation Layer | Updating Lights
Fra:1 Mem:246.26M (Peak 246.26M) | Time:00:00.08 | Mem:10.20M, Peak:10.20M | Scene, Animation Layer | Updating Lights | Computing distribution
Fra:1 Mem:246.65M (Peak 246.65M) | Time:00:00.08 | Mem:10.60M, Peak:10.60M | Scene, Animation Layer | Updating Integrator
Fra:1 Mem:247.65M (Peak 247.65M) | Time:00:00.08 | Mem:11.60M, Peak:11.60M | Scene, Animation Layer | Updating Film
Fra:1 Mem:247.66M (Peak 247.66M) | Time:00:00.08 | Mem:11.52M, Peak:11.60M | Scene, Animation Layer | Updating Lookup Tables
Fra:1 Mem:247.66M (Peak 247.66M) | Time:00:00.08 | Mem:11.60M, Peak:11.60M | Scene, Animation Layer | Updating Baking
Fra:1 Mem:247.66M (Peak 247.66M) | Time:00:00.08 | Mem:11.60M, Peak:11.60M | Scene, Animation Layer | Updating Device | Writing constant memory
Fra:1 Mem:247.66M (Peak 247.66M) | Time:00:00.08 | Mem:11.60M, Peak:11.60M | Scene, Animation Layer | Rendered 0/2 Tiles, Sample 0/128
Fra:1 Mem:323.65M (Peak 323.65M) | Time:00:00.22 | Remaining:00:24.48 | Mem:87.54M, Peak:87.54M | Scene, Animation Layer | Rendered 0/2 Tiles, Sample 1/128
Fra:1 Mem:323.65M (Peak 323.65M) | Time:00:13.97 | Remaining:00:05.64 | Mem:87.54M, Peak:87.54M | Scene, Animation Layer | Rendered 0/2 Tiles, Sample 128/128
Fra:1 Mem:323.65M (Peak 323.65M) | Time:00:13.97 | Remaining:00:05.64 | Mem:87.54M, Peak:87.54M | Scene, Animation Layer | Rendered 1/2 Tiles, Sample 128/128
Fra:1 Mem:278.56M (Peak 323.65M) | Time:00:14.00 | Remaining:00:05.59 | Mem:42.45M, Peak:87.54M | Scene, Animation Layer | Rendered 1/2 Tiles, Sample 1/128
Fra:1 Mem:278.56M (Peak 323.65M) | Time:00:18.70 | Mem:42.45M, Peak:87.54M | Scene, Animation Layer | Rendered 1/2 Tiles, Sample 128/128
Fra:1 Mem:278.56M (Peak 323.65M) | Time:00:18.70 | Mem:42.45M, Peak:87.54M | Scene, Animation Layer | Rendered 1/2 Tiles, Sample 0/128
Fra:1 Mem:278.56M (Peak 323.65M) | Time:00:18.70 | Mem:42.45M, Peak:87.54M | Scene, Animation Layer | Finished
Fra:1 Mem:157.11M (Peak 323.65M) | Time:00:18.71 | Mem:0.00M, Peak:87.54M | Scene | Reading full buffer from disk
Fra:1 Mem:263.89M (Peak 323.65M) | Time:00:18.80 | Mem:0.00M, Peak:87.54M | Scene | Animation Layer | Finishing
Fra:1 Mem:246.59M (Peak 513.07M) | Time:00:19.97 | Compositing
Fra:1 Mem:246.59M (Peak 513.07M) | Time:00:19.97 | Compositing | Determining resolution
Fra:1 Mem:246.59M (Peak 513.07M) | Time:00:19.97 | Compositing | Initializing execution
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.61 | Compositing | Tile 1-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.61 | Compositing | Tile 2-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.61 | Compositing | Tile 3-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.61 | Compositing | Tile 4-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.61 | Compositing | Tile 5-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.61 | Compositing | Tile 6-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.62 | Compositing | Tile 7-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.62 | Compositing | Tile 8-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.62 | Compositing | Tile 9-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.62 | Compositing | Tile 11-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.62 | Compositing | Tile 10-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.62 | Compositing | Tile 12-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.62 | Compositing | Tile 13-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.62 | Compositing | Tile 14-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.62 | Compositing | Tile 15-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.62 | Compositing | Tile 16-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.62 | Compositing | Tile 17-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.62 | Compositing | Tile 18-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.62 | Compositing | Tile 19-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.62 | Compositing | Tile 20-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.63 | Compositing | Tile 21-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.69 | Compositing | Tile 22-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.69 | Compositing | Tile 23-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.69 | Compositing | Tile 24-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.70 | Compositing | Tile 25-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.70 | Compositing | Tile 26-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.70 | Compositing | Tile 27-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.77 | Compositing | Tile 28-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.78 | Compositing | Tile 29-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.78 | Compositing | Tile 30-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.78 | Compositing | Tile 31-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.78 | Compositing | Tile 32-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.79 | Compositing | Tile 33-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.84 | Compositing | Tile 34-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.84 | Compositing | Tile 35-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.84 | Compositing | Tile 36-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.84 | Compositing | Tile 37-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.84 | Compositing | Tile 38-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.84 | Compositing | Tile 39-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.88 | Compositing | Tile 40-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.88 | Compositing | Tile 41-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.88 | Compositing | Tile 42-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.88 | Compositing | Tile 43-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.89 | Compositing | Tile 44-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.89 | Compositing | Tile 45-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.99 | Compositing | Tile 46-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.99 | Compositing | Tile 47-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.99 | Compositing | Tile 48-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.99 | Compositing | Tile 49-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:20.99 | Compositing | Tile 50-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.00 | Compositing | Tile 51-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.07 | Compositing | Tile 52-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.08 | Compositing | Tile 53-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.08 | Compositing | Tile 54-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.08 | Compositing | Tile 55-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.08 | Compositing | Tile 56-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.08 | Compositing | Tile 57-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.15 | Compositing | Tile 58-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.15 | Compositing | Tile 59-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.15 | Compositing | Tile 60-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.15 | Compositing | Tile 61-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.16 | Compositing | Tile 62-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.16 | Compositing | Tile 63-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.21 | Compositing | Tile 64-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.21 | Compositing | Tile 65-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.21 | Compositing | Tile 66-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.22 | Compositing | Tile 67-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.22 | Compositing | Tile 68-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.22 | Compositing | Tile 69-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.24 | Compositing | Tile 70-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.25 | Compositing | Tile 71-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.25 | Compositing | Tile 72-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.25 | Compositing | Tile 73-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.27 | Compositing | Tile 74-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.29 | Compositing | Tile 75-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.30 | Compositing | Tile 76-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.30 | Compositing | Tile 77-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.31 | Compositing | Tile 78-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.32 | Compositing | Tile 79-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.32 | Compositing | Tile 80-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.33 | Compositing | Tile 81-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.33 | Compositing | Tile 82-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.33 | Compositing | Tile 83-84
Fra:1 Mem:549.28M (Peak 584.88M) | Time:00:21.34 | Compositing | Tile 84-84
Fra:1 Mem:549.22M (Peak 584.88M) | Time:00:21.34 | Compositing | De-initializing execution
Saved: '/workspace/output/frame_000001.png'
Time: 00:21.75 (Saving: 00:00.41)

Fra:2 Mem:235.68M (Peak 584.88M) | Time:00:00.01 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | tire protection
Fra:2 Mem:235.77M (Peak 584.88M) | Time:00:00.01 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | tire protection.001
Fra:2 Mem:235.80M (Peak 584.88M) | Time:00:00.01 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | wheel ax
Fra:2 Mem:235.90M (Peak 584.88M) | Time:00:00.01 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | tire protection.002
Fra:2 Mem:236.01M (Peak 584.88M) | Time:00:00.01 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | tire protection.003
Fra:2 Mem:236.01M (Peak 584.88M) | Time:00:00.01 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | tire protection.004
Fra:2 Mem:237.10M (Peak 584.88M) | Time:00:00.01 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | wheel tire bar
Fra:2 Mem:237.76M (Peak 584.88M) | Time:00:00.01 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | tire protection.005
Fra:2 Mem:238.10M (Peak 584.88M) | Time:00:00.01 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | wheel curve
Fra:2 Mem:238.21M (Peak 584.88M) | Time:00:00.01 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | wheel tire bar.001
Fra:2 Mem:238.66M (Peak 584.88M) | Time:00:00.01 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | BezierCurve.003
Fra:2 Mem:239.07M (Peak 584.88M) | Time:00:00.01 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | z pedals axe
Fra:2 Mem:239.12M (Peak 584.88M) | Time:00:00.01 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | BezierCurve.004
Fra:2 Mem:239.56M (Peak 584.88M) | Time:00:00.01 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | wheel tire bar.002
Fra:2 Mem:239.62M (Peak 584.88M) | Time:00:00.01 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | wheel perp.003
Fra:2 Mem:239.74M (Peak 584.88M) | Time:00:00.01 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | seat
Fra:2 Mem:239.86M (Peak 584.88M) | Time:00:00.01 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | wheel perp.005
Fra:2 Mem:239.87M (Peak 584.88M) | Time:00:00.01 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | wheel perp.004
Fra:2 Mem:239.87M (Peak 584.88M) | Time:00:00.01 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | wheel perp.008
Fra:2 Mem:239.87M (Peak 584.88M) | Time:00:00.01 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | spring top
Fra:2 Mem:239.88M (Peak 584.88M) | Time:00:00.01 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | breaks.001
Fra:2 Mem:239.89M (Peak 584.88M) | Time:00:00.01 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | pedal cyl
Fra:2 Mem:240.05M (Peak 584.88M) | Time:00:00.01 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | break tube
Fra:2 Mem:240.18M (Peak 584.88M) | Time:00:00.01 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | break tube.001
Fra:2 Mem:240.31M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | breaks
Fra:2 Mem:240.37M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | break tube.002
Fra:2 Mem:240.39M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | chain protection
Fra:2 Mem:240.42M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | tire.001
Fra:2 Mem:240.42M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | chain
Fra:2 Mem:240.61M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | wheel perp.013
Fra:2 Mem:240.69M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cube
Fra:2 Mem:240.71M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.001
Fra:2 Mem:240.74M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | sky
Fra:2 Mem:240.72M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.002
Fra:2 Mem:240.72M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.003
Fra:2 Mem:240.72M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.004
Fra:2 Mem:240.74M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.006
Fra:2 Mem:240.79M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.007
Fra:2 Mem:240.95M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.008
Fra:2 Mem:240.99M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.010
Fra:2 Mem:240.98M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.011
Fra:2 Mem:241.12M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.014
Fra:2 Mem:241.12M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.017
Fra:2 Mem:241.30M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.018
Fra:2 Mem:241.32M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.020
Fra:2 Mem:241.37M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.021
Fra:2 Mem:241.43M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Curve.026
Fra:2 Mem:241.46M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.023
Fra:2 Mem:241.52M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.024
Fra:2 Mem:241.55M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Curve.025
Fra:2 Mem:241.62M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.025
Fra:2 Mem:241.81M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.028
Fra:2 Mem:241.85M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.030
Fra:2 Mem:241.91M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.031
Fra:2 Mem:241.97M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.033
Fra:2 Mem:242.00M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.034
Fra:2 Mem:242.05M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.035
Fra:2 Mem:242.15M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.036
Fra:2 Mem:242.20M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.026
Fra:2 Mem:242.24M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.027
Fra:2 Mem:242.34M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.037
Fra:2 Mem:242.38M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.038
Fra:2 Mem:242.39M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.040
Fra:2 Mem:242.45M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Cylinder.041
Fra:2 Mem:242.92M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Curve.024
Fra:2 Mem:243.00M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Curve.023
Fra:2 Mem:243.01M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Curve.022
Fra:2 Mem:243.04M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Curve.021
Fra:2 Mem:243.06M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Curve.020
Fra:2 Mem:243.06M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Curve.019
Fra:2 Mem:243.06M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Curve.018
Fra:2 Mem:243.06M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Curve.017
Fra:2 Mem:243.06M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Curve.016
Fra:2 Mem:243.09M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Curve.015
Fra:2 Mem:243.10M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Curve.014
Fra:2 Mem:243.10M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Synchronizing object | Curve.013
Fra:2 Mem:243.13M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Initializing
Fra:2 Mem:229.58M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Waiting for render to start
Fra:2 Mem:229.58M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Loading render kernels (may take a few minutes the first time)
Fra:2 Mem:229.58M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Updating Scene
Fra:2 Mem:229.58M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Updating Shaders
Fra:2 Mem:229.66M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Updating Procedurals
Fra:2 Mem:229.66M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Updating Background
Fra:2 Mem:229.66M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Updating Camera
Fra:2 Mem:229.66M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Updating Meshes Flags
Fra:2 Mem:229.66M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Updating Objects
Fra:2 Mem:229.66M (Peak 584.88M) | Time:00:00.02 | Mem:0.00M, Peak:0.00M | Scene, Animation Layer | Updating Objects | Copying Transformations to device
Fra:2 Mem:229.69M (Peak 584.88M) | Time:00:00.02 | Mem:0.03M, Peak:0.03M | Scene, Animation Layer | Updating Objects | Applying Static Transformations
Fra:2 Mem:229.69M (Peak 584.88M) | Time:00:00.02 | Mem:0.03M, Peak:0.03M | Scene, Animation Layer | Updating Particle Systems
Fra:2 Mem:229.69M (Peak 584.88M) | Time:00:00.02 | Mem:0.03M, Peak:0.03M | Scene, Animation Layer | Updating Particle Systems | Copying Particles to device
Fra:2 Mem:229.69M (Peak 584.88M) | Time:00:00.02 | Mem:0.03M, Peak:0.03M | Scene, Animation Layer | Updating Meshes
Fra:2 Mem:232.09M (Peak 584.88M) | Time:00:00.02 | Mem:0.03M, Peak:0.03M | Scene, Animation Layer | Updating Mesh | Computing attributes
Fra:2 Mem:232.11M (Peak 584.88M) | Time:00:00.02 | Mem:0.03M, Peak:0.03M | Scene, Animation Layer | Updating Mesh | Copying Attributes to device
Fra:2 Mem:232.10M (Peak 584.88M) | Time:00:00.02 | Mem:0.03M, Peak:0.03M | Scene, Animation Layer | Updating Scene BVH | Building
Fra:2 Mem:232.10M (Peak 584.88M) | Time:00:00.02 | Mem:0.03M, Peak:0.03M | Scene, Animation Layer | Updating Scene BVH | Building BVH
Fra:2 Mem:241.12M (Peak 584.88M) | Time:00:00.05 | Mem:0.03M, Peak:0.03M | Scene, Animation Layer | Updating Scene BVH | Packing BVH triangles and strands
Fra:2 Mem:241.72M (Peak 584.88M) | Time:00:00.05 | Mem:0.03M, Peak:0.03M | Scene, Animation Layer | Updating Scene BVH | Packing BVH nodes
Fra:2 Mem:241.34M (Peak 584.88M) | Time:00:00.06 | Mem:0.03M, Peak:0.03M | Scene, Animation Layer | Updating Scene BVH | Copying BVH to device
Fra:2 Mem:241.34M (Peak 584.88M) | Time:00:00.06 | Mem:4.65M, Peak:4.65M | Scene, Animation Layer | Updating Mesh | Computing normals
Fra:2 Mem:246.81M (Peak 584.88M) | Time:00:00.06 | Mem:4.65M, Peak:4.65M | Scene, Animation Layer | Updating Mesh | Copying Mesh to device
Fra:2 Mem:246.81M (Peak 584.88M) | Time:00:00.06 | Mem:10.12M, Peak:10.12M | Scene, Animation Layer | Updating Objects Flags
Fra:2 Mem:246.81M (Peak 584.88M) | Time:00:00.06 | Mem:10.12M, Peak:10.12M | Scene, Animation Layer | Updating Primitive Offsets
Fra:2 Mem:246.81M (Peak 584.88M) | Time:00:00.06 | Mem:10.12M, Peak:10.12M | Scene, Animation Layer | Updating Images
Fra:2 Mem:246.81M (Peak 584.88M) | Time:00:00.06 | Mem:10.12M, Peak:10.12M | Scene, Animation Layer | Updating Camera Volume
Fra:2 Mem:246.81M (Peak 584.88M) | Time:00:00.06 | Mem:10.12M, Peak:10.12M | Scene, Animation Layer | Updating Lookup Tables
Fra:2 Mem:246.81M (Peak 584.88M) | Time:00:00.06 | Mem:10.20M, Peak:10.20M | Scene, Animation Layer | Updating Lights
Fra:2 Mem:246.81M (Peak 584.88M) | Time:00:00.06 | Mem:10.20M, Peak:10.20M | Scene, Animation Layer | Updating Lights | Computing distribution
Fra:2 Mem:247.21M (Peak 584.88M) | Time:00:00.06 | Mem:10.60M, Peak:10.60M | Scene, Animation Layer | Updating Integrator
Fra:2 Mem:248.21M (Peak 584.88M) | Time:00:00.06 | Mem:11.60M, Peak:11.60M | Scene, Animation Layer | Updating Film
Fra:2 Mem:248.21M (Peak 584.88M) | Time:00:00.06 | Mem:11.52M, Peak:11.60M | Scene, Animation Layer | Updating Lookup Tables
Fra:2 Mem:248.21M (Peak 584.88M) | Time:00:00.06 | Mem:11.60M, Peak:11.60M | Scene, Animation Layer | Updating Baking
Fra:2 Mem:248.21M (Peak 584.88M) | Time:00:00.06 | Mem:11.60M, Peak:11.60M | Scene, Animation Layer | Updating Device | Writing constant memory
Fra:2 Mem:248.21M (Peak 584.88M) | Time:00:00.06 | Mem:11.60M, Peak:11.60M | Scene, Animation Layer | Rendered 0/2 Tiles, Sample 0/128
Fra:2 Mem:324.20M (Peak 584.88M) | Time:00:00.16 | Remaining:00:18.92 | Mem:87.54M, Peak:87.54M | Scene, Animation Layer | Rendered 0/2 Tiles, Sample 1/128
Fra:2 Mem:324.20M (Peak 584.88M) | Time:00:13.60 | Remaining:00:05.50 | Mem:87.54M, Peak:87.54M | Scene, Animation Layer | Rendered 0/2 Tiles, Sample 128/128
Fra:2 Mem:324.20M (Peak 584.88M) | Time:00:13.60 | Remaining:00:05.50 | Mem:87.54M, Peak:87.54M | Scene, Animation Layer | Rendered 1/2 Tiles, Sample 128/128
Fra:2 Mem:279.11M (Peak 584.88M) | Time:00:13.64 | Remaining:00:05.45 | Mem:42.45M, Peak:87.54M | Scene, Animation Layer | Rendered 1/2 Tiles, Sample 1/128
Fra:2 Mem:279.11M (Peak 584.88M) | Time:00:18.59 | Mem:42.45M, Peak:87.54M | Scene, Animation Layer | Rendered 1/2 Tiles, Sample 128/128
Fra:2 Mem:279.11M (Peak 584.88M) | Time:00:18.59 | Mem:42.45M, Peak:87.54M | Scene, Animation Layer | Rendered 1/2 Tiles, Sample 0/128
Fra:2 Mem:279.11M (Peak 584.88M) | Time:00:18.59 | Mem:42.45M, Peak:87.54M | Scene, Animation Layer | Finished
Fra:2 Mem:157.66M (Peak 584.88M) | Time:00:18.60 | Mem:0.00M, Peak:87.54M | Scene | Reading full buffer from disk
Fra:2 Mem:264.45M (Peak 584.88M) | Time:00:18.68 | Mem:0.00M, Peak:87.54M | Scene | Animation Layer | Finishing
Fra:2 Mem:246.63M (Peak 584.88M) | Time:00:19.22 | Compositing
Fra:2 Mem:246.63M (Peak 584.88M) | Time:00:19.22 | Compositing | Determining resolution
Fra:2 Mem:246.63M (Peak 584.88M) | Time:00:19.22 | Compositing | Initializing execution
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.80 | Compositing | Tile 1-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.81 | Compositing | Tile 2-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.81 | Compositing | Tile 3-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.81 | Compositing | Tile 4-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.81 | Compositing | Tile 5-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.81 | Compositing | Tile 6-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.82 | Compositing | Tile 7-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.82 | Compositing | Tile 8-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.82 | Compositing | Tile 9-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.82 | Compositing | Tile 10-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.82 | Compositing | Tile 11-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.82 | Compositing | Tile 12-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.82 | Compositing | Tile 13-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.82 | Compositing | Tile 14-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.82 | Compositing | Tile 15-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.86 | Compositing | Tile 16-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.86 | Compositing | Tile 17-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.86 | Compositing | Tile 18-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.86 | Compositing | Tile 19-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.86 | Compositing | Tile 20-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.86 | Compositing | Tile 21-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.91 | Compositing | Tile 22-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.91 | Compositing | Tile 23-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.91 | Compositing | Tile 24-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.91 | Compositing | Tile 25-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.91 | Compositing | Tile 26-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.91 | Compositing | Tile 27-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.99 | Compositing | Tile 28-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.99 | Compositing | Tile 29-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.99 | Compositing | Tile 30-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:19.99 | Compositing | Tile 31-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.00 | Compositing | Tile 32-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.00 | Compositing | Tile 33-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.03 | Compositing | Tile 34-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.03 | Compositing | Tile 35-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.03 | Compositing | Tile 36-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.03 | Compositing | Tile 37-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.04 | Compositing | Tile 38-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.04 | Compositing | Tile 39-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.10 | Compositing | Tile 40-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.10 | Compositing | Tile 41-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.10 | Compositing | Tile 42-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.10 | Compositing | Tile 43-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.10 | Compositing | Tile 44-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.10 | Compositing | Tile 45-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.17 | Compositing | Tile 46-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.17 | Compositing | Tile 47-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.17 | Compositing | Tile 48-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.17 | Compositing | Tile 49-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.17 | Compositing | Tile 50-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.17 | Compositing | Tile 51-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.17 | Compositing | Tile 52-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.26 | Compositing | Tile 53-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.26 | Compositing | Tile 54-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.26 | Compositing | Tile 55-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.26 | Compositing | Tile 56-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.26 | Compositing | Tile 57-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.27 | Compositing | Tile 58-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.35 | Compositing | Tile 59-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.36 | Compositing | Tile 60-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.36 | Compositing | Tile 61-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.36 | Compositing | Tile 62-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.36 | Compositing | Tile 63-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.36 | Compositing | Tile 64-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.39 | Compositing | Tile 65-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.39 | Compositing | Tile 66-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.39 | Compositing | Tile 67-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.40 | Compositing | Tile 68-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.40 | Compositing | Tile 69-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.40 | Compositing | Tile 70-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.42 | Compositing | Tile 71-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.42 | Compositing | Tile 72-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.43 | Compositing | Tile 73-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.43 | Compositing | Tile 74-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.45 | Compositing | Tile 75-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.47 | Compositing | Tile 76-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.49 | Compositing | Tile 77-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.50 | Compositing | Tile 78-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.50 | Compositing | Tile 79-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.51 | Compositing | Tile 80-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.51 | Compositing | Tile 81-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.51 | Compositing | Tile 82-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.52 | Compositing | Tile 83-84
Fra:2 Mem:549.33M (Peak 584.92M) | Time:00:20.52 | Compositing | Tile 84-84
Fra:2 Mem:549.26M (Peak 584.92M) | Time:00:20.52 | Compositing | De-initializing execution
Saved: '/workspace/output/frame_000002.png'
Time: 00:20.94 (Saving: 00:00.41)
            `}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};
