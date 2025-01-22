import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAnteContract } from "utils/web3";
import TollIcon from "@mui/icons-material/Toll";

export const StackDialog = ({ open, setOpen, setValue, setCoin }) => {
  const { wallet } = useSelector((state) => state.blockchain);
  const [balances, setBalances] = useState({ eth: 0, erc20: 0 });
  const [error, setError] = useState("na");
  const [data, setData] = useState({ eth: 0, erc20: 0 });
  useEffect(() => {
    if (!wallet) handleClose();
  }, [wallet]);

  const getBalances = async () => {
    const { contract, signer, provider } = await getAnteContract(
      window.ethereum,
      wallet
    );
    const response = await provider.getBalance(wallet);
    const eth = ethers.formatEther(response);
    setBalances({ eth, erc20: 0 });
  };

  useEffect(() => {
    if (data.eth > balances.eth) {
      setError("Not enought ETH balance");
      return;
    }

    if (data.eth < 0 || data.erc20 < 0) {
      setError("Only positive balances");
      return;
    }

    if (data.erc20 > balances.erc20) {
      setError("Not enought ERC20 balance");
      return;
    }

    setError("na");
  }, [data]);

  useEffect(() => {
    if (open && wallet) getBalances();
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    if (data.erc20 > 0) {
      setCoin("erc20");
      setValue(data.erc20);
    } else {
      setCoin("eth");
      setValue(data.eth);
    }

    handleClose();
  };
  return (
    <Dialog
      open={open}
      fullWidth
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>Select Coin and amount to stack</DialogTitle>
      <DialogContent>
        <Grid
          container
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={2}
          textAlign={"center"}
        >
          <Grid item xs={12}>
            <Typography variant="body">You have:</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" marginBottom={2}>
              ETH: {balances.eth}
            </Typography>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">ETH</InputLabel>
              <OutlinedInput
                type="number"
                onChange={(e) => setData({ eth: e.target.value, erc20: 0 })}
                value={data.eth}
                inputProps={{ min: 0 }}
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">
                    <TollIcon />
                  </InputAdornment>
                }
                label="Amount"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" marginBottom={2}>
              ERC20: {balances.erc20}
            </Typography>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">ERC20</InputLabel>
              <OutlinedInput
                onChange={(e) => setData({ eth: 0, erc20: e.target.value })}
                value={data.erc20}
                inputProps={{ min: 0 }}
                type="number"
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">
                    <TollIcon />
                  </InputAdornment>
                }
                label="Amount"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} visibility={error != "na" ? "visible" : "hidden"}>
            <Typography variant="body2" color={"error"}>
              {`  `}
              {error}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleAccept}
          autoFocus
          variant="contained"
          disabled={error != "na" || (data.erc20 == 0 && data.eth == 0)}
        >
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};
