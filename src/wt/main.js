import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { Worker, isMainThread } from "worker_threads";
import { cpus } from "os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const workerFilename = "worker.js";
const workerPath = join(__dirname, workerFilename);
const initialValue = 10;

const getResultAsObject = (isResolved, value) => {
  const status = isResolved ? "resolved" : "error";
  const data = value ? value : null;
  return { status, data };
};

const performCalculations = async () => {
  const numberOfCPUCores = cpus().length;
  if (isMainThread) {
    const workers = [];
    for (let i = 0; i < numberOfCPUCores; i++) {
      workers.push(
        new Promise((resolve, reject) => {
          const worker = new Worker(workerPath);
          worker.postMessage(`${initialValue + i}`);
          worker.on("message", (result) => {
            resolve(getResultAsObject(true, result));
          });
          worker.on("error", () => {
            reject(getResultAsObject(false, null));
          });
        })
      );
    }
    Promise.allSettled(workers).then((values) => {
      console.log(values.map((v) => (v.value ? v.value : v.reason)));
    });
  }
};

await performCalculations();
