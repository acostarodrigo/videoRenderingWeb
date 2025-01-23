import store from "state/store";
import { showSnackbar } from "state/ui";
import { setTasks } from "state/videoRendering";
import { VideoRenderingStargateClient } from "../cosmosClient/dist/stargateClient";
export const getVideoRenderingTasks = async () => {
  try {
    const cosmosClient = await VideoRenderingStargateClient.connect(
      process.env.RPC_URL
    );
    const queryClient = cosmosClient.videoRenderingQueryClient.videoRendering;

    const result = [];
    for (let i = 1; i < 100; i++) {
      const task = await queryClient.GetVideoRenderingTask(i);
      if (task) {
        console.log(task);
        result.push(task);
      } else {
        break;
      }
    }

    store.dispatch(setTasks(result));
  } catch (error) {
    console.log(error);
    store.dispatch(
      showSnackbar({
        severity: "error",
        message: "Unable to load tasks from Janction. Contact support",
      })
    );
  }
};
