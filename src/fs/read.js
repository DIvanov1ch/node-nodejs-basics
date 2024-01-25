import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { readFile } from "node:fs/promises";
import { error, log } from "console";

const ERROR_MESSAGE = "FS operation failed";
const sourceFolderName = "files";
const fileToRead = "fileToRead.txt";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fileToReadPath = join(__dirname, sourceFolderName, fileToRead);

const read = async () => {
  try {
    const content = await readFile(fileToReadPath, { encoding: "utf-8" });
    log(content);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(ERROR_MESSAGE);
    }
  }
};

await read().catch(error);
