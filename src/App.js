import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@mui/material";
import getTheme from "theme";

import { PageNotFound } from "pages/PageNotFound";
import { Home } from "pages/Home/Home";
import { CustomSnackbar } from "components/CustomSnackbar";
import { CustomBackdrop } from "components/CustomBackdrop";
import { useEffect } from "react";
import { getVideoRenderingTasks } from "utils/videoRendering";
import { RenderingExplorer } from "pages/RenderingExplorer";
import { RenderTask } from "pages/RenderTask";
import { HowItWorks } from "pages/HowItWorks";
import { Join } from "pages/Join";
import Faucet from "pages/Faucet";

function App() {
  useEffect(() => {
    getVideoRenderingTasks();
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={getTheme("light")}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/explorer" element={<RenderingExplorer />} />
          <Route exact path="/render" element={<RenderTask />} />
          <Route exact path="/join" element={<Join />} />
          <Route exact path="/how" element={<HowItWorks />} />
          <Route exact path="/faucet" element={<Faucet />} />
          <Route path={"*"} exact element={<PageNotFound />} />
        </Routes>
        <CustomSnackbar />
        <CustomBackdrop />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
