import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createGunzip } from "zlib";
import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "fs";

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
