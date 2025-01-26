import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CardHeader,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { shortenAddress } from "utils/misc";
import { VideoRenderingThreadCard } from "./VideoRenderingThreadCard";
import { SolutionCard } from "./SolutionCard";

export default function VideoRenderingTaskCard({ task }) {
  const [expanded, setExpanded] = useState(!task.completed);
  const { address } = useSelector((state) => state.blockchain);
  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography component="span" sx={{ width: "33%", flexShrink: 0 }}>
          Task ID {task.taskId} - {task.completed ? "Completed" : "In Progress"}
        </Typography>
        <Typography component="span" sx={{ color: "text.secondary" }}>
          Created by{" "}
          {task.requester == address ? "You" : shortenAddress(task.requester)}
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <>
          {task.threads.map((thread, index) => (
            <VideoRenderingThreadCard thread={thread} key={index} />
          ))}

          {task.completed && <SolutionCard task={task} />}
        </>
      </AccordionDetails>
    </Accordion>
  );
}

VideoRenderingTaskCard.propTypes = {
  task: PropTypes.object.isRequired,
};
