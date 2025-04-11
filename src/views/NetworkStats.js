import React, { useEffect } from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import CountUp from "react-countup";

const mockStats = {
  totalNodes: 128,
  totalWorkers: 342,
  averageRenderTime: "1.23s",
  totalFramesRendered: 98423,
  topPerformers: [
    { name: "Node_Alpha", earnings: "$532", avgTime: "0.8s" },
    { name: "Node_Beta", earnings: "$478", avgTime: "1.1s" },
    { name: "Node_Gamma", earnings: "$392", avgTime: "1.3s" },
  ],
};

export const NetworkStats = () => {
  const { tasks, averageRenderTime, totalFramesRendered, workers } =
    useSelector((state) => state.videoRendering);

  const theme = useTheme();
  console.log("====================================");
  console.log("there", theme);
  console.log("====================================");
  return (
    <>
      <Box sx={{ px: 4, py: 8, backgroundColor: theme.palette.grey[300] }}>
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            color={"primary"}
          >
            Network Stats - Updated realtime
          </Typography>

          <Grid container spacing={4} sx={{ mb: 6 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" color={"primary"}>
                    Total Nodes
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color={"primary"}>
                    {workers.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" color={"primary"}>
                    Total Videos rendered
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color={"primary"}>
                    <CountUp end={tasks.length} duration={5} />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" color={"primary"}>
                    Avg Frame Render Time (sec)
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color={"primary"}>
                    <CountUp end={averageRenderTime || 0} duration={5} />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" color={"primary"}>
                    Frames Rendered
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color={"primary"}>
                    <CountUp end={totalFramesRendered} duration={5} />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
