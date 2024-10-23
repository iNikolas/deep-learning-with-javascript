"use client";

import React from "react";
import { useModelStore } from "../../ai-network/model";

export function ModelUI() {
  const { isReady, isError, loss, prediction, train, evaluate, predict } =
    useModelStore();

  const [inputValue, setInputValue] = React.useState<number>(0);
  const [isTraining, setIsTraining] = React.useState(false);

  const handleTrain = async () => {
    setIsTraining(true);

    await train();

    setIsTraining(false);
  };

  const handlePredict = () => {
    predict(inputValue);
  };

  return (
    <div className="container mx-auto p-6 flex flex-col items-center justify-center space-y-6">
      <div className="w-full max-w-md p-8 bg-base-100 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Deep Learning Model
        </h1>
        <div className="space-y-4">
          {!isReady && (
            <button
              className="btn btn-primary w-full"
              onClick={handleTrain}
              disabled={isReady || isTraining}
            >
              {!isTraining && (isReady ? "Model Trained" : "Train Model")}
              {isTraining && (
                <span className="loading loading-ring loading-sm" />
              )}
            </button>
          )}

          {isReady && (
            <>
              {loss ? (
                <div className="alert alert-info shadow-lg">
                  <div>
                    <span>Loss: {loss.replace(/[a-z]/gi, "")}</span>
                  </div>
                </div>
              ) : (
                <button
                  className="btn btn-secondary w-full"
                  onClick={evaluate}
                  disabled={!isReady}
                >
                  Evaluate Model
                </button>
              )}

              <div className="space-y-2">
                <label className="block text-lg font-medium">
                  Predict Time (Input Size in MB)
                </label>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handlePredict();
                  }}
                >
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(Number(e.target.value))}
                    className="input input-bordered w-full"
                    placeholder="Enter size in MB"
                  />
                  <button
                    type="submit"
                    className="btn btn-accent w-full"
                    disabled={!isReady}
                  >
                    Predict
                  </button>
                </form>
                {prediction && (
                  <div className="alert alert-success shadow-lg mt-2">
                    <div>
                      <span>
                        Prediction: {prediction.replace(/[a-z\[\],]/gi, "")}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              {isError && (
                <div className="alert alert-error shadow-lg">
                  <div>
                    <span>Error occurred during training or evaluation.</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
