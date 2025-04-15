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
import { isMobile } from "react-device-detect";
import { NumericFormat } from "react-number-format";

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

  const sortByWinnings = (workerA, workerB) => {
    const a = Number(workerA.reputation?.winnings?.amount || 0);
    const b = Number(workerB.reputation?.winnings?.amount || 0);

    return b - a; // ascending
  };
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
                <strong>Avg Time / Frame </strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workers.toSorted(sortByWinnings).map((worker, index) => (
              <TableRow key={index}>
                <TableCell>
                  {isMobile ? shortenAddress(worker.address) : worker.address}
                </TableCell>
                <TableCell>
                  $ {worker.reputation?.winnings?.amount / 1_000_000 || 0} JCT
                </TableCell>
                <TableCell>
                  {worker.reputation?.renderDurations.length > 0
                    ? worker.reputation?.renderDurations[
                        worker.reputation?.renderDurations.length - 1
                      ].low
                    : 0}{" "}
                  seconds
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
