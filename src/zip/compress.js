import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createGzip } from "zlib";
import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "fs";
import { error } from "console";

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
