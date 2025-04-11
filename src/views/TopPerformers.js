import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { shortenAddress } from "utils/misc";

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

export const TopPerformers = () => {
  const theme = useTheme();
  const { workers } = useSelector((state) => state.videoRendering);
  return (
    <>
      {/* Top Performers Table */}
      <Typography variant="h5" gutterBottom>
        Top Performing Nodes
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Node</strong>
              </TableCell>
              <TableCell>
                <strong>Earnings</strong>
              </TableCell>
              <TableCell>
                <strong>Avg Time / Frame in seconds</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workers.map((worker, index) => (
              <TableRow key={index}>
                <TableCell>{shortenAddress(worker.address)}</TableCell>
                <TableCell>
                  $ {worker.reputation?.winnings?.amount || 0} JCT
                </TableCell>
                <TableCell>
                  {worker.reputation.renderDurations[0].low}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
