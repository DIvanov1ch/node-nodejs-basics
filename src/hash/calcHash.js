import { pipeline } from "stream/promises";
import { createReadStream } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { stdout } from "process";

const FOLDER_NAME = "files";
const FILE_NAME = "fileToCalculateHashFor.txt";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filepath = join(__dirname, FOLDER_NAME, FILE_NAME);

const calculateHash = async () => {
  const input = createReadStream(filepath);
  const hash = createHash("sha256");
  pipeline(input, hash.setEncoding("hex"), stdout);
  // or using pipe
  // input.pipe(hash).setEncoding("hex").pipe(stdout);
};

await calculateHash();
