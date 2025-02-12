import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
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
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { shortenAddress } from "utils/misc";
import { isMobile } from "react-device-detect";
import { getWorkerLogs } from "utils/videoRendering";
import { useDispatch } from "react-redux";
import { showSnackbar } from "state/ui";
import moment from "moment";

export const WorkerLog = ({ worker, threadId, open, setOpen }) => {
  const dispatch = useDispatch();
  const [logs, setLogs] = useState([]);
  const [isConnecting, setIsConnecting] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  const connectAndGet = async () => {
    try {
      setIsConnecting(true);
      const result = await getWorkerLogs(worker, threadId);
      console.log("====================================");
      console.log(result);
      console.log("====================================");
      setLogs(result.logs);
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      dispatch(
        showSnackbar({
          severity: "error",
          message: "There was an error connecting to the worker.",
        })
      );
    } finally {
      setIsConnecting(false);
    }
  };
  useEffect(() => {
    if (open) {
      connectAndGet();
    }
  }, []);

  const getSeverity = (severity) => {
    switch (severity) {
      case 0:
        return <InfoIcon color="primary" />;
      case 1:
        return <CheckCircleIcon color="success" />;
      case 2:
        return <ErrorIcon color="error" />;
      default:
        return <InfoIcon color="primary" />;
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 1, // Ensure it's above other content
      }}
    >
      <DialogTitle>
        Logs for Worker {isMobile ? shortenAddress(worker) : worker}
      </DialogTitle>
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
        {isConnecting ? (
          <Grid
            container
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={2}
          >
            <Grid item>
              <CircularProgress />
            </Grid>
            <Grid item>
              <Typography variant="h5">Stablishing connection...</Typography>
            </Grid>
          </Grid>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Log </StyledTableCell>
                  <StyledTableCell align="center">Timestamp</StyledTableCell>
                  <StyledTableCell align="center">Severity</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.map((row) => (
                  <TableRow
                    key={row.log}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {row.log}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {moment.unix(row.timestamp.low).fromNow()}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {getSeverity(row.severity)}
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
