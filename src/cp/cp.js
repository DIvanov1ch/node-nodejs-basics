import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { fork } from "node:child_process";
import { stdout, stdin } from "process";

const FOLDER_NAME = "files";
const FILE_NAME = "script.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filepath = join(__dirname, FOLDER_NAME, FILE_NAME);

const spawnChildProcess = async (args) => {
  const child = fork(filepath, args, { silent: true });
  stdin.pipe(child.stdin);
  child.stdout.pipe(stdout);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(["someArgument1", "someArgument2", "child"]);
