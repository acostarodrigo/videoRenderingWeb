import store from "state/store";
import { setBackdropMessage, showSnackbar } from "state/ui";
import {
  addWorker,
  setAverageRenderTime,
  setLoading,
  setTasks,
} from "state/audioStem";
import { create } from "ipfs-http-client";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import { AudioStemStargateClient } from "../audioStemClient/dist/stargateClient";
export const getAudioStemTasks = async () => {
  try {
    store.dispatch(setLoading(true));
    const cosmosClient = await AudioStemStargateClient.connect(
      process.env.RPC_URL
    );
    const queryClient = cosmosClient.audioStemQueryClient.audioStem;
    const result = [];
    let totalAverage = 0;
    let amount = 0;
    for (let i = 1; i < 100; i++) {
      const task = await queryClient.GetAudioStemTask(i.toString());
      if (task?.taskId) {
        // we calculate the average time for all tasks
        for (const thread of task.threads) {
          if (thread.averageStemSeconds?.low > 0) {
            totalAverage = totalAverage + thread.averageStemSeconds.low;
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

export const getWorkerLogs = async (worker, threadId) => {
  const cosmosClient = await AudioStemStargateClient.connect(
    process.env.RPC_URL
  );
  const queryClient = cosmosClient.audioStemQueryClient.audioStem;
  const response = await queryClient.GetWorker(worker);
  const { publicIp } = response;
  const url = `http://${publicIp}:26657`;
  const cosmos = await AudioStemStargateClient.connect(url);
  const query = cosmos.AudioStemStargateClient.audioStem;
  const result = await query.GetVideoRenderingLog(threadId);
  return result;
};
