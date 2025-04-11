import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@mui/material";
import getTheme from "theme";

import { PageNotFound } from "pages/PageNotFound";
import { Home } from "pages/Home/Home";
import { CustomSnackbar } from "components/CustomSnackbar";
import { CustomBackdrop } from "components/CustomBackdrop";
import { useEffect } from "react";
import { getVideoRenderingTasks } from "utils/videoRendering";

function App() {
  useEffect(() => {
    getVideoRenderingTasks();
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={getTheme("light")}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path={"*"} exact element={<PageNotFound />} />
        </Routes>
        <CustomSnackbar />
        <CustomBackdrop />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
