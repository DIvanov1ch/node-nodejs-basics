import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { access, rename as renameFile, readdir } from "node:fs/promises";
import { error } from "console";

const fileToRename = "wrongFilename.txt";
const newFileName = "properFilename.md";
const ERROR_MESSAGE = "FS operation failed";
const sourceFolderName = "files";

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(__dirname, sourceFolderName);
const fileToRenamePath = join(__dirname, sourceFolderName, fileToRename);
const renamedFilePath = join(__dirname, sourceFolderName, newFileName);

const rename = async () => {
  try {
    await access(fileToRenamePath);
    const files = await readdir(sourcePath);
    if (files.includes(newFileName)) {
      const existError = new Error(ERROR_MESSAGE);
      existError.code = "EEXIST";
      throw existError;
    }
    await renameFile(fileToRenamePath, renamedFilePath);
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "EEXIST") {
      throw new Error(ERROR_MESSAGE);
    }
  }
};

await rename().catch(error);
