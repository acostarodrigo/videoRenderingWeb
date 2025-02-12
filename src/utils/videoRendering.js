import store from "state/store";
import { showSnackbar } from "state/ui";
import { setTasks } from "state/videoRendering";
import { create } from "ipfs-http-client";
import JSZip from "jszip";
import { saveAs } from "file-saver";

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

export const IPFSDownload = async (cids) => {
  const zip = new JSZip();
  const ipfs = create({ url: "/ip4/127.0.0.1/tcp/5001" }); // Adjust if needed

  for (const dirCid of cids) {
    for await (const file of ipfs.ls(dirCid)) {
      if (file.type !== "file") continue; // Skip directories, only process files

      const fileChunks = [];
      for await (const chunk of ipfs.cat(file.cid)) {
        fileChunks.push(chunk);
      }
      const fileContent = new Uint8Array(Buffer.concat(fileChunks));

      // Add only the filename to the ZIP (ignoring IPFS directory structure)
      zip.file(file.name, fileContent);
    }
  }

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
