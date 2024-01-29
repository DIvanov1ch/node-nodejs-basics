import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createReadStream } from "node:fs";
import { stdout } from "process";

const FOLDER_NAME = "files";
const FILE_NAME = "fileToRead.txt";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filepath = join(__dirname, FOLDER_NAME, FILE_NAME);

const read = async () => {
  createReadStream(filepath).pipe(stdout);
};

await read();
