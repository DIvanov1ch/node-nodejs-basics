import { dirname, join } from "path";
import { readdir, mkdir, copyFile } from "node:fs/promises";
import { fileURLToPath } from "url";
import { error } from "console";

const sourceFolderName = "files";
const destinationFolderName = "files_copy";
const ERROR_MESSAGE = "FS operation failed";

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(__dirname, sourceFolderName);
const destinationPath = join(__dirname, destinationFolderName);

const copy = async () => {
  try {
    const files = await readdir(sourcePath);
    await mkdir(destinationPath);
    await Promise.all(
      files.map(async (file) => {
        const src = join(sourcePath, file);
        const dest = join(destinationPath, file);
        await copyFile(src, dest).catch(error);
      })
    );
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "EEXIST") {
      throw new Error(ERROR_MESSAGE);
    }
  }
};

await copy().catch(error);
