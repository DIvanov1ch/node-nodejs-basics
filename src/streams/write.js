import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createWriteStream } from "node:fs";
import { stdin } from "process";

const FOLDER_NAME = "files";
const FILE_NAME = "fileToWrite.txt";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filepath = join(__dirname, FOLDER_NAME, FILE_NAME);

const write = async () => {
  stdin.pipe(createWriteStream(filepath, { flags: "a" }));
};

await write();
