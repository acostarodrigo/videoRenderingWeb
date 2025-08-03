import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import BigNumber from "bignumber.js";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { shortenAddress } from "utils/misc";
import { VideoRenderingThreadCard } from "./VideoRenderingThreadCard";
import { SolutionCard } from "./SolutionCard";
import { AudioStemThreadCard } from "./AudioStemThreadCard";
import { AudioStemSolutionCard } from "./AudioStemSolutionCard";

export default function AudioStemTaskCard({ task, explorer = true }) {
  const [expanded, setExpanded] = useState(!task.completed);
  const { address } = useSelector((state) => state.blockchain);
  console.log("stem task", task);
  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Grid
          container
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          spacing={1}
        >
          <Grid item>
            <Typography component="span" sx={{ width: "33%", flexShrink: 0 }}>
              Task ID {task.taskId} -{" "}
              {task.completed ? "Completed" : "In Progress"}
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="span" sx={{ color: "text.secondary" }}>
              Created by{" "}
              {task.requester == address
                ? "You"
                : shortenAddress(task.requester)}
            </Typography>
          </Grid>
          <Grid item>
            $JCT {BigNumber(task.reward?.amount).dividedBy(1e6).toFormat(3)}
          </Grid>
        </Grid>
      </AccordionSummary>

      <AccordionDetails>
        <>
          {task.threads.map((thread, index) => (
            <AudioStemThreadCard thread={thread} key={index} />
          ))}

          {task.completed & !explorer ? (
            <AudioStemSolutionCard task={task} />
          ) : (
            <></>
          )}
        </>
      </AccordionDetails>
    </Accordion>
  );
}

AudioStemTaskCard.propTypes = {
  task: PropTypes.object.isRequired,
};
