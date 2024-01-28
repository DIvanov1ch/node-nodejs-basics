import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createWriteStream } from "fs";
import { stdin } from "process";

const FOLDER_NAME = "files";
const FILE_NAME = "fileToWrite.txt";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filepath = join(__dirname, FOLDER_NAME, FILE_NAME);

const write = async () => {
  stdin.pipe(createWriteStream(filepath));
};

await write();
