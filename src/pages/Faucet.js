// src/pages/Faucet.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { ConnectWalletButton } from "components/ConnectWalletButton";
import { useSelector } from "react-redux";
import { Footer } from "views/Footer";
import { TopBar } from "components/TopBar";

const FAUCET_URL = process.env.FAUCET_URL;

export default function Faucet() {
  const { address } = useSelector((state) => state.blockchain);
  const [loading, setLoading] = useState(false);
  const [resultMsg, setResultMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const requestTokens = async () => {
    if (!address) return;
    setLoading(true);
    setErrorMsg(null);
    setResultMsg(null);

    try {
      const res = await fetch(
        `${FAUCET_URL}/faucet?address=${encodeURIComponent(address)}`
      );
      console.log("faucet response", res);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Faucet error: ${res.status} ${text}`);
      }
      setResultMsg("🎉 1 JCT has been sent to your address!");
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopBar />
      <Box
        sx={{
          maxWidth: 480,
          mx: "auto",
          mt: 6,
          p: 4,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Faucet
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          You are using Janction’s testnet blockchain. Request some JCT tokens
          to render video animations.
        </Typography>

        {/* 1) Wallet connection */}
        <ConnectWalletButton />
        {address && (
          <Typography
            variant="subtitle2"
            sx={{ mt: 1, wordBreak: "break-all" }}
          >
            Connected: {address}
          </Typography>
        )}

        {/* 2) Request button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 4, position: "relative" }}
          disabled={!address || loading}
          onClick={requestTokens}
        >
          Request 1 JCT
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: "primary.contrastText",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Button>

        {/* 3) Result or error */}
        {resultMsg && (
          <Alert severity="success" sx={{ mt: 3 }}>
            {resultMsg}
          </Alert>
        )}
        {errorMsg && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {errorMsg}
          </Alert>
        )}
      </Box>
      <Footer />
    </>
  );
}
