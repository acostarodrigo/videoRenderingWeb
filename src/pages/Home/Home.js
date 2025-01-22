import React from "react";
import { Container } from "@mui/material";
import { TopBar } from "components/TopBar";
import { Footer } from "components/Footer";

export const Home = () => {
  return (
    <>
      <Container>
        <TopBar />
        Jasmy
        <Footer />
      </Container>
    </>
  );
};
