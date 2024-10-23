import React from "react";
import { ModelUI } from "./components/model-ui";
import { epochs, shape } from "./ai-network/config/constants";

export default function Page() {
  return (
    <main className="p-8 min-h-screen flex flex-col items-center">
      <article className="prose">
        <h1 className="text-3xl font-bold mb-4">
          Predicting Download Time Using Machine Learning
        </h1>
        <p className="mb-4">
          In this article, we&apos;re building a simple machine learning model
          using <strong>TensorFlow.js</strong> to predict download times based
          on file size. Our first model is an implementation of{" "}
          <em>linear regression</em>, which can be visualized as the
          mathematical equation <strong>y = mx + b</strong>. Here, <em>m</em> is
          the slope, <em>b</em> is the y-intercept, and <em>x</em> represents
          the file size. TensorFlow.js, the JavaScript version of TensorFlow,
          has built-in tools that make implementing this kind of model simple.
        </p>

        <p>
          The basic building blocks of a neural network are called{" "}
          <strong>layers</strong>. These layers are analogous to neurons in the
          human brain, processing data to make predictions. Our model has only{" "}
          <strong>one layer</strong>, which serves a very specific purpose - it
          tries to find the best values for <em>m</em> and <em>b</em> so that we
          can predict <em>y</em> (download time) given any <em>x</em> (file
          size). In this case, the layer is a simple <em>dense layer</em> which
          takes inputs and outputs predictions directly.
        </p>

        <p>
          We have a set of predefined and hardcoded data of <em>x</em> and{" "}
          <em>y</em>, which acts as our training dataset. This data is what the
          model learns from, allowing it to adjust and improve its prediction
          accuracy. Training involves feeding this data to the model and
          adjusting its parameters repeatedly. Each complete cycle over the
          dataset is called an <strong>epoch</strong>. In our case, the model is
          trained over {epochs} epochs, meaning it sees the same data {epochs}{" "}
          times in order to learn from it. For reference, our dataset contains{" "}
          {shape[0]} records.
        </p>

        <h2 className="text-2xl font-bold mb-4">How the Model Learns</h2>
        <p>
          Our model uses something called a <strong>loss function</strong> to
          measure how far off its predictions are from the actual data. In
          simple terms, the lower the loss, the better the model is performing.
          After each epoch, the model adjusts its internal parameters (the
          values of <em>m</em> and <em>b</em>) to reduce this loss, making the
          prediction more accurate each time. This is handled by an{" "}
          <strong>optimizer</strong>, which is a special algorithm designed to
          minimize the loss.
        </p>

        <h2 className="text-2xl font-bold mb-4">
          Visualization and Interaction
        </h2>
        <p>
          To make this process more interactive, we’ve built a user interface
          where you can visualize the training progress and make predictions
          yourself. You can input a file size, and our trained model will
          predict how long it will take to download. This is a great way to see
          machine learning in action and understand the relationship between
          data and predictions.
        </p>

        <h2 className="text-2xl font-bold mb-4">Why Linear Regression?</h2>
        <p>
          Linear regression is one of the simplest machine learning models and
          is often the starting point for learning. It works well when the
          relationship between the input and output is roughly linear – meaning
          that as the input (file size) increases, the output (download time)
          also increases at a consistent rate. For more complex relationships,
          more advanced models can be used, but linear regression is a fantastic
          introduction to how machine learning works.
        </p>

        <p>
          This project demonstrates the fundamentals of supervised learning,
          where a model learns from labeled data (our x and y values) to make
          predictions on new, unseen data. The trained model can then generalize
          and predict download times for any file size that wasn’t part of the
          original dataset.
        </p>
      </article>
      <ModelUI />
    </main>
  );
}
