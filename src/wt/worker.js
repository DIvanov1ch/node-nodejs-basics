import { parentPort } from "node:worker_threads";

// n should be received from main thread
const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  parentPort.on("message", (n) => {
    const number = nthFibonacci(n);
    // if (Math.random() > 0.5) throw new Error('Generated Error');
    parentPort.postMessage(number);
    parentPort.close();
  });
};

sendResult();
