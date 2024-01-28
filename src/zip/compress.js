import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createGzip } from "zlib";
import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "fs";

const FOLDER_NAME = "files";
const fileToCompress = "fileToCompress.txt";
const fileNameAfterCompress = "archive.gz";

const __dirname = dirname(fileURLToPath(import.meta.url));
const source = join(__dirname, FOLDER_NAME, fileToCompress);
const destination = join(__dirname, FOLDER_NAME, fileNameAfterCompress);

const compress = async () => {
  pipeline(
    createReadStream(source),
    createGzip(),
    createWriteStream(destination)
  );
};

await compress();
