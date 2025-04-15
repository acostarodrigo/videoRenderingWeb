import React, { useState } from "react";
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

export const RenderTask = () => {
  const [file, setFile] = useState(null);
  const [startFrame, setStartFrame] = useState(1);
  const [endFrame, setEndFrame] = useState(250);
  const [workers, setWorkers] = useState(10);
  const [reward, setReward] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a Blender file.");
      return;
    }

    // Replace with actual blockchain TX or API logic
    console.log("Creating task with values:", {
      file,
      startFrame,
      endFrame,
      workers,
      reward,
    });

    alert("Render task submitted!");
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

          {/* Form */}
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
                  valueIsNumericString
                  placeholder="JCT Amount"
                  // prefix="JCT "
                  //   variant="standard"
                  label="Reward in JCT"
                  required
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
        </Paper>
      </Container>
      <Footer />
    </>
  );
};
