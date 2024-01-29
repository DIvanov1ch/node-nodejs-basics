import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createGzip } from "node:zlib";
import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { error } from "node:console";

const FOLDER_NAME = "files";
const fileToCompress = "fileToCompress.txt";
const compressedFile = "archive.gz";

const __dirname = dirname(fileURLToPath(import.meta.url));
const source = join(__dirname, FOLDER_NAME, fileToCompress);
const destination = join(__dirname, FOLDER_NAME, compressedFile);

const compress = async () => {
  pipeline(
    createReadStream(source),
    createGzip(),
    createWriteStream(destination)
  ).catch(error);
};

await compress();
