import React from "react";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "state/blockchain";
import { showSnackbar } from "state/ui";
import { shortenAddress } from "utils/misc";
import { getSigningClient } from "utils/web3";

export const ConnectWalletButton = () => {
  const { address } = useSelector((state) => state.blockchain);
  const dispatch = useDispatch();
  const handleConnectWallet = async () => {
    let keplr;
    keplr = window.keplr;

    console.log(keplr);
    if (!keplr) {
      alert("You need to install Keplr");
      throw new Error("You need to install Keplr");
    }

    try {
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar({ severity: "warning", message: "Install Keplr wallet!" })
      );
      return;
    }
    try {
      const [creator] = await getSigningClient(keplr);
      dispatch(setAddress(creator));
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Button
      onClick={handleConnectWallet}
      variant="contained"
      color="secondary"
      disabled={address != ""}
      fullWidth
    >
      <Typography variant="body" color={"primary"}>
        {address ? shortenAddress(address) : "Connect your wallet"}
      </Typography>
    </Button>
  );
};
