import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { rm } from "node:fs/promises";
import { error } from "console";

const fileToRemove = "fileToRemove.txt";
const ERROR_MESSAGE = "FS operation failed";
const sourceFolderName = "files";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fileToRemovePath = join(__dirname, sourceFolderName, fileToRemove);

const remove = async () => {
  try {
    await rm(fileToRemovePath);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(ERROR_MESSAGE);
    }
  }
};

await remove().catch(error);
