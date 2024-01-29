import { dirname, join } from "node:path";
import { readdir, mkdir, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { error } from "node:console";

const sourceFolderName = "files";
const destinationFolderName = "files_copy";
const ERROR_MESSAGE = "FS operation failed";

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(__dirname, sourceFolderName);
const destinationPath = join(__dirname, destinationFolderName);

const copy = async () => {
  const copyDir = async (src, dest) => {
    try {
      const files = await readdir(src, {
        withFileTypes: true,
      });
      await mkdir(dest);
      await Promise.all(
        files.map(async (file) => {
          const source = join(src, file.name);
          const destination = join(dest, file.name);
          if (file.isFile()) {
            await copyFile(source, destination).catch(error);
          }
          if (file.isDirectory()) {
            await copyDir(source, destination);
          }
        })
      );
    } catch (error) {
      if (error.code === "ENOENT" || error.code === "EEXIST") {
        throw new Error(ERROR_MESSAGE);
      }
    }
  };
  await copyDir(sourcePath, destinationPath);
};

await copy().catch(error);
