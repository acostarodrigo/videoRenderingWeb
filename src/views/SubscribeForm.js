import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
} from "@mui/material";

export const SubscribeForm = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }

    // Replace this with your actual subscribe logic (API, mailchimp, etc.)
    console.log("Subscribing:", email);
    setSubmitted(true);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Stay in the Loop
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Want to stay in touch and find out more about us?
          <br />
          Subscribe to our newsletter to get the latest Janction updates.
        </Typography>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <TextField
                fullWidth
                type="email"
                label="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" variant="contained" size="large">
                Subscribe
              </Button>
            </Box>
          </form>
        ) : (
          <Typography variant="h6" sx={{ mt: 3 }}>
            ✅ Thank you! You're subscribed.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};
