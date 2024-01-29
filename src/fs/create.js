import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { writeFile } from "node:fs/promises";
import { error } from "node:console";

const content = "I am fresh and young";
const FOLDER_NAME = "files";
const FILE_NAME = "fresh.txt";
const ERROR_MESSAGE = "FS operation failed";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filepath = join(__dirname, FOLDER_NAME, FILE_NAME);

const create = async () => {
  try {
    await writeFile(filepath, content, { flag: "wx" });
  } catch (error) {
    if (error.code === "EEXIST") {
      throw new Error(ERROR_MESSAGE);
    }
  }
};

await create().catch(error);
