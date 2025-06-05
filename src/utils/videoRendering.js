import store from "state/store";
import { setBackdropMessage, showSnackbar } from "state/ui";
import {
  addWorker,
  setAverageRenderTime,
  setLoading,
  setTasks,
  setTotalFramesRendered,
} from "state/videoRendering";
import { create } from "ipfs-http-client";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import { VideoRenderingStargateClient } from "../cosmosClient/dist/stargateClient";
export const getVideoRenderingTasks = async () => {
  try {
    store.dispatch(setLoading(true));
    const cosmosClient = await VideoRenderingStargateClient.connect(
      process.env.RPC_URL
    );
    const queryClient = cosmosClient.videoRenderingQueryClient.videoRendering;
    const result = [];
    let totalAverage = 0;
    let amount = 0;
    let totalFramesRendered = 0;
    for (let i = 1; i < 100; i++) {
      const task = await queryClient.GetVideoRenderingTask(i.toString());
      if (task?.taskId) {
        totalFramesRendered =
          totalFramesRendered + (task.endFrame - task.startFrame);

        // we calculate the average time for all tasks
        for (const thread of task.threads) {
          if (thread.averageRenderSeconds?.low > 0) {
            totalAverage = totalAverage + thread.averageRenderSeconds.low;
            amount = amount + 1;
          }

          for (const worker of thread.workers) {
            const response = await queryClient.GetWorker(worker);
            store.dispatch(addWorker(response));
          }
        }

        result.push(task);
      } else {
        continue;
      }
    }

    store.dispatch(setTasks(result));
    store.dispatch(setTotalFramesRendered(totalFramesRendered));
    if (amount > 0 && totalAverage > 0)
      store.dispatch(setAverageRenderTime(totalAverage / amount));
  } catch (error) {
    console.log(error);
    store.dispatch(
      showSnackbar({
        severity: "error",
        message: "Unable to load tasks from Janction. Contact support",
      })
    );
  } finally {
    store.dispatch(setLoading(false));
  }
};

export const IPFSDownload = async (cids) => {
  const zip = new JSZip();
  const ipfs = create({ url: process.env.IPFS_NODE }); // Adjust if needed
  store.dispatch(setBackdropMessage("Connecting to IPFS instance..."));
  for (const dirCid of cids) {
    for await (const file of ipfs.ls(dirCid)) {
      if (file.type !== "file") continue; // Skip directories, only process files

      const fileChunks = [];
      for await (const chunk of ipfs.cat(file.cid)) {
        store.dispatch(setBackdropMessage(`Downloading file ${file.name}...`));
        fileChunks.push(chunk);
      }
      const fileContent = new Uint8Array(Buffer.concat(fileChunks));

      // Add only the filename to the ZIP (ignoring IPFS directory structure)
      zip.file(file.name, fileContent);
    }
  }

  store.dispatch(setBackdropMessage(`Generating zip file...`));
  const zipBlob = await zip.generateAsync({ type: "blob" });
  saveAs(zipBlob, "files.zip"); // Trigger download
};

export const getWorkerLogs = async (worker, threadId) => {
  const cosmosClient = await VideoRenderingStargateClient.connect(
    process.env.RPC_URL
  );
  const queryClient = cosmosClient.videoRenderingQueryClient.videoRendering;
  const response = await queryClient.GetWorker(worker);
  const { publicIp } = response;
  const url = `http://${publicIp}:26657`;
  const cosmos = await VideoRenderingStargateClient.connect(url);
  const query = cosmos.videoRenderingQueryClient.videoRendering;
  const result = await query.GetVideoRenderingLog(threadId);
  return result;
};
