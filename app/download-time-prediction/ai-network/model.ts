import { create } from "zustand";
import * as tf from "@tensorflow/tfjs";

import { testData, trainData } from "./config/data";
import {
  epochs,
  inputShape,
  loss,
  optimizer,
  shape,
  units,
} from "./config/constants";

const model = tf.sequential();

const trainTensors = {
  sizeMB: tf.tensor2d(trainData.sizeMB, shape),
  timeSec: tf.tensor2d(trainData.timeSec, shape),
};
const testTensors = {
  sizeMB: tf.tensor2d(testData.sizeMB, shape),
  timeSec: tf.tensor2d(testData.timeSec, shape),
};

model.add(tf.layers.dense({ inputShape, units }));
model.compile({ optimizer, loss });

export const useModelStore = create<{
  isReady: boolean;
  isError: boolean;
  loss: string;
  prediction: string;
  train: () => Promise<void>;
  evaluate: () => void;
  resetModel: () => void;
  predict: (input: number) => void;
  showSummary: () => void;
}>((set, get) => ({
  isReady: false,
  isError: false,
  loss: "",
  prediction: "",

  train: async () => {
    if (get().isReady) {
      return;
    }

    try {
      await model.fit(trainTensors.sizeMB, trainTensors.timeSec, {
        epochs,
      });

      set({ isReady: true, isError: false });
    } catch (error) {
      console.error(error);
      set({ isError: true });
    }
  },

  evaluate: () => {
    const loss = model
      .evaluate(testTensors.sizeMB, testTensors.timeSec)
      .toString();
    set({ loss });
  },

  resetModel: () => {
    set({ isReady: false, isError: false, loss: "", prediction: "" });
  },

  predict: (input: number) => {
    const inputTensor = tf.tensor2d([[input]], [1, 1]);
    const predictionTensor = model.predict(inputTensor);

    const predictionValue = predictionTensor.toString();

    set({ prediction: predictionValue });
  },

  showSummary: () => {
    model.summary();
  },
}));
