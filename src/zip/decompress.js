import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createGunzip } from "node:zlib";
import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "node:fs";

const FOLDER_NAME = "files";
const fileToDecompress = "archive.gz";
const decompressedFile = "fileToCompress.txt";

const __dirname = dirname(fileURLToPath(import.meta.url));
const source = join(__dirname, FOLDER_NAME, fileToDecompress);
const destination = join(__dirname, FOLDER_NAME, decompressedFile);

const decompress = async () => {
  pipeline(
    createReadStream(source),
    createGunzip(),
    createWriteStream(destination)
  ).catch((err) => {
    if (err.code === "ENOENT") {
      console.log(`No such file or directory ${fileToDecompress}`);
    }
  });
};

await decompress();
