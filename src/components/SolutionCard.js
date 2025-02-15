import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IPFSDownload } from "utils/videoRendering";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { hideBackdrop, showBackdrop, showSnackbar } from "state/ui";

export const SolutionCard = ({ task }) => {
  const [cids, setCids] = useState([]);
  const [amount, setAmount] = useState(0);
  const { address } = useSelector((state) => state.blockchain);
  const dispatch = useDispatch();

  const getCids = () => {
    const result = [];
    for (const thread of task.threads) {
      console.log(thread);
      result.push(thread.solution?.files);
      setAmount(
        (current) => current + (thread.endFrame - thread.startFrame) + 1
      );
    }

    setCids(result);
  };
  useEffect(() => {
    getCids();
  }, []);

  const handleDownload = async () => {
    try {
      dispatch(showBackdrop());
      await IPFSDownload(cids);
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar({
          severity: "error",
          message: "Unable to download file. Please try again",
        })
      );
    } finally {
      dispatch(hideBackdrop());
    }
  };
  return (
    <>
      <Typography variant="h5" textAlign={"center"}>
        {" "}
        {amount} files ready to download
      </Typography>
      {address ? (
        <Button
          fullWidth
          onClick={handleDownload}
          variant="contained"
          // disabled={address != task.requester}
        >
          {" "}
          Download
        </Button>
      ) : (
        <ConnectWalletButton />
      )}
    </>
  );
};
