import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { readdir } from "node:fs/promises";
import { error, log } from "console";

const ERROR_MESSAGE = "FS operation failed";
const sourceFolderName = "files";

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(__dirname, sourceFolderName);

const list = async () => {
  try {
    const files = await readdir(sourcePath);
    files.forEach((file) => log(file));
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(ERROR_MESSAGE);
    }
  }
};

await list().catch(error);
