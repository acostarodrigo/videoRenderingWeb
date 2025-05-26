import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";

const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h}h ${m}m ${s}s`;
};

export const RenderTimeEstimator = () => {
  const { workers, averageRenderTime } = useSelector(
    (state) => state.videoRendering
  );
  const [stats, setStats] = useState({
    availableWorkers: workers.length,
    secondsPerFrame: averageRenderTime,
    workersPerThread: workers.length > 10 ? 10 : 2,
  });

  useEffect(() => {
    setStats({
      availableWorkers: workers.length,
      secondsPerFrame: averageRenderTime,
      workersPerThread: workers.length > 10 ? 10 : 2,
    });
  }, [workers, averageRenderTime]);

  const [frames, setFrames] = useState(10000);
  const [result, setResult] = useState(null);

  const handleEstimate = () => {
    const res = calculateRenderTime(frames, stats);
    setResult(res);
  };

  const handleRender = () => {
    // Placeholder — implement your real logic here
    alert(`Submitting render job for ${frames} frames...`);
  };

  const calculateRenderTime = (frames, stats) => {
    let threads = Math.floor(100 / stats.workersPerThread);
    if (threads === 0) threads = 1;
    if (threads === 0 || stats.secondsPerFrame <= 0) return null;

    const framesPerThread = frames / threads;
    const totalTime = framesPerThread * stats.secondsPerFrame;
    return {
      threads,
      timeInSeconds: totalTime,
      humanReadable: formatTime(totalTime),
    };
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", px: 2, py: 10 }}>
      <Paper sx={{ p: 4 }} elevation={3}>
        <Typography variant="h4" gutterBottom>
          Estimate Render Time
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Available workers: <strong>{stats.availableWorkers}</strong> → grouped
          into{" "}
          <strong>
            {Math.floor(stats.availableWorkers / stats.workersPerThread) === 0
              ? 1
              : Math.floor(stats.availableWorkers / stats.workersPerThread)}
          </strong>{" "}
          threads (max 10 workers per thread)
          <br />
          Render speed:{" "}
          <strong>
            {stats.secondsPerFrame.toFixed(2)} frames/second per thread
          </strong>
        </Typography>

        <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Total Frames to Render"
              type="number"
              value={frames}
              onChange={(e) => setFrames(+e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button fullWidth variant="contained" onClick={handleEstimate}>
              Estimate
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {result && (
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Estimated Render Time:
            </Typography>

            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={8}>
                <Typography variant="h4" fontWeight="bold">
                  {result.humanReadable}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button fullWidth variant="outlined" onClick={handleRender}>
                  Render animation
                </Button>
              </Grid>
            </Grid>

            <Box mt={3}>
              <Typography variant="body2" color="text.secondary">
                • You entered <strong>{frames}</strong> frames to render. <br />
                • The network currently has{" "}
                <strong>{stats.availableWorkers}</strong> available workers.
                <br />• Workers are grouped into threads of{" "}
                <strong>{stats.workersPerThread}</strong>, creating{" "}
                <strong>{result.threads}</strong> parallel threads.
                <br />• Each thread will render approximately{" "}
                <strong>{(frames / result.threads).toFixed(0)}</strong> frames.
                <br />• Each frame takes{" "}
                <strong>{stats.secondsPerFrame.toFixed(2)}</strong> seconds to
                render.
                <br />• The total render time is based on how long one thread
                takes to finish its frames.
              </Typography>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};
