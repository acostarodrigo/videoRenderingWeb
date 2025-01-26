import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IPFSDownload } from "utils/videoRendering";
import { ConnectWalletButton } from "./ConnectWalletButton";

export const SolutionCard = ({ task }) => {
  const [cids, setCids] = useState([]);
  const { address } = useSelector((state) => state.blockchain);

  const getCids = () => {
    const result = [];
    for (const thread of task.threads) {
      if (thread.solution?.files.length > 0) {
        result.push(...thread.solution?.files);
      }
    }

    setCids(result);
  };
  useEffect(() => {
    getCids();
  }, []);

  const handleDownload = async () => {
    try {
      await IPFSDownload(cids);
    } catch (error) {}
  };
  return (
    <>
      <Typography variant="h5" textAlign={"center"}>
        {" "}
        {cids.length} files ready to download
      </Typography>
      {address ? (
        <Button
          fullWidth
          onClick={handleDownload}
          variant="contained"
          disabled={address != task.requester}
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
