import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { readdir } from "node:fs/promises";
import { error, log } from "node:console";

const ERROR_MESSAGE = "FS operation failed";
const sourceFolderName = "files";

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(__dirname, sourceFolderName);

const list = async () => {
  try {
    const files = await readdir(sourcePath, { recursive: true });
    log(files);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(ERROR_MESSAGE);
    }
  }
};

await list().catch(error);
