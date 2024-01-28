import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createReadStream } from "fs";
import { stdout } from "process";

const FOLDER_NAME = "files";
const FILE_NAME = "fileToRead.txt";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filepath = join(__dirname, FOLDER_NAME, FILE_NAME);

const read = async () => {
  createReadStream(filepath).pipe(stdout);
};

await read();
