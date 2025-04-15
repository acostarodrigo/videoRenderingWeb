import { Box, Typography, Container, IconButton, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/X";
import InsertLinkIcon from "@mui/icons-material/Link"; // for Docs or generic
import logo from "images/logo.png";
export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        mt: 8,
        borderTop: "1px solid #e0e0e0",
        backgroundColor: "#fafafa",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        {/* Logo + Name */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{ height: 32, width: "auto", mr: 1 }}
          />
          <Typography variant="subtitle1" fontWeight="bold">
            Janction
          </Typography>
        </Box>

        {/* Social + External Links */}
        <Stack direction="row" spacing={1}>
          <IconButton
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Documentation"
          >
            <InsertLinkIcon />
          </IconButton>
        </Stack>

        {/* Copyright */}
        <Typography variant="body2" color="text.secondary" textAlign="center">
          © {new Date().getFullYear()} Janction. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};
