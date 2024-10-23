"use client";

import React from "react";
import { useModelStore } from "../../ai-network/model";

export function ModelUI() {
  const {
    isReady,
    isError,
    loss,
    prediction,
    train,
    evaluate,
    resetModel,
    predict,
    showSummary,
  } = useModelStore();

  const [inputValue, setInputValue] = React.useState<number>(0);
  const [predictionResult, setPredictionResult] = React.useState<string>("");

  const handleTrain = async () => {
    await train();
  };

  const handlePredict = () => {
    predict(inputValue);
    setPredictionResult(prediction);
  };

  return (
    <div className="container mx-auto p-6 flex flex-col items-center justify-center space-y-6">
      <div className="w-full max-w-md p-8 bg-base-100 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Deep Learning Model
        </h1>
        <div className="space-y-4">
          <button
            className="btn btn-primary w-full"
            onClick={handleTrain}
            disabled={isReady}
          >
            {isReady ? "Model Trained" : "Train Model"}
          </button>

          <button
            className="btn btn-secondary w-full"
            onClick={evaluate}
            disabled={!isReady}
          >
            Evaluate Model
          </button>

          <button className="btn btn-info w-full" onClick={showSummary}>
            Show Model Summary
          </button>

          <div className="space-y-2">
            <label className="block text-lg font-medium">
              Predict Time (Input Size in MB)
            </label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(Number(e.target.value))}
              className="input input-bordered w-full"
              placeholder="Enter size in MB"
            />
            <button
              className="btn btn-accent w-full"
              onClick={handlePredict}
              disabled={!isReady}
            >
              Predict
            </button>
            {predictionResult && (
              <div className="alert alert-success shadow-lg mt-2">
                <div>
                  <span>Prediction: {predictionResult}</span>
                </div>
              </div>
            )}
          </div>

          {loss && (
            <div className="alert alert-info shadow-lg">
              <div>
                <span>Loss: {loss}</span>
              </div>
            </div>
          )}
          {isError && (
            <div className="alert alert-error shadow-lg">
              <div>
                <span>Error occurred during training or evaluation.</span>
              </div>
            </div>
          )}

          <button className="btn btn-warning w-full" onClick={resetModel}>
            Reset Model
          </button>
        </div>
      </div>
    </div>
  );
}
