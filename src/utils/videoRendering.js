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
  const ipfs = create({ url: "/ip4/127.0.0.1/tcp/5001" }); // Replace with your IPFS endpoint if needed

  for (const cid of cids) {
    const chunks = [];
    for await (const chunk of ipfs.cat(cid)) {
      chunks.push(chunk);
    }
    const fileContent = new Uint8Array(Buffer.concat(chunks));
    zip.file(cid, fileContent); // Add file to ZIP, use CID as filename
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });
  saveAs(zipBlob, "files.zip"); // Trigger download
};
