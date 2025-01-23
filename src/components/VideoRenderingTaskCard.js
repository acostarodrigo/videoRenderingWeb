import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { VideoRenderingThread } from "cosmosClient/dist/types/generated/janction/videoRendering/v1/types";
import { useSelector } from "react-redux";
import { shortenAddress } from "utils/misc";

export default function VideoRenderingTaskCard({ task }) {
  const { address } = useSelector((state) => state.blockchain);
  return (
    <Card elevation={4}>
      <CardContent>
        <CardHeader
          title={`Task ID ${task.taskId}`}
          subheader={`Created by ${
            task.requester == address ? "You" : shortenAddress(task.requester)
          }`}
        />
        <Typography variant="body">
          {task.inProgress ? "In progress" : "Completed"}
        </Typography>
        {/* <List title="Threads">
          {task.threads.map((thread, index) => (
            <ListItem disablePadding id={index}>
              {<VideoRenderingThread thread={thread} />}
            </ListItem>
          ))}
        </List> */}
      </CardContent>
    </Card>
  );
}

VideoRenderingTaskCard.propTypes = {
  task: PropTypes.object.isRequired,
};
