import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IPFSDownload } from "utils/videoRendering";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { hideBackdrop, showBackdrop, showSnackbar } from "state/ui";
import { create } from "ipfs-http-client";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export const AudioStemSolutionCard = ({ task }) => {
  const [cids, setCids] = useState([]);
  const [amount, setAmount] = useState(0);
  const { address } = useSelector((state) => state.blockchain);
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);

  const getCids = async () => {
    const ipfs = create({ url: process.env.IPFS_NODE });
    const result = [];

    for (const thread of task.threads) {
      const dirCid = thread.solution?.dir;
      if (!dirCid) continue;

      for await (const file of ipfs.ls(dirCid)) {
        if (file.type !== "file") continue;

        result.push({
          name: file.name,
          cid: file.cid.toString(),
          dirCid,
        });
      }
    }

    setFileList(result);
    setAmount(result.length);
  };
  useEffect(() => {
    getCids();
  }, []);

  const streamAndPlay = async (file) => {
    try {
      dispatch(showBackdrop());
      const ipfs = create({ url: process.env.IPFS_NODE });
      const chunks = [];

      for await (const chunk of ipfs.cat(file.cid)) {
        chunks.push(chunk);
      }

      const blob = new Blob([Buffer.concat(chunks)], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play();
    } catch (err) {
      console.error(err);
      dispatch(
        showSnackbar({
          severity: "error",
          message: `Unable to play ${file.name}.`,
        })
      );
    } finally {
      dispatch(hideBackdrop());
    }
  };

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
        {amount} files ready
      </Typography>

      {address ? (
        <>
          <Button
            fullWidth
            onClick={handleDownload}
            variant="contained"
            disabled={address !== task.requester}
            sx={{ mb: 2 }}
          >
            Download All
          </Button>

          <Grid
            container
            direction={"row"}
            spacing={2}
            justifyContent={"space-around"}
            alignItems={"center"}
            marginTop={2}
          >
            {fileList.map((file, idx) => (
              <Grid size={{ xs: 6, md: 8 }} key={idx}>
                <Typography variant="body1">{file.name}</Typography>
                <Button
                  onClick={() => streamAndPlay(file)}
                  size="small"
                  variant="outlined"
                >
                  Listen
                </Button>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <ConnectWalletButton />
      )}
    </>
  );
};
