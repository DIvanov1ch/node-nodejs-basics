import path from "path";
import { open, close, writeFile } from "node:fs";

const content = "I am fresh and young";
const FOLDER_NAME = "files";
const FILE_NAME = "fresh.txt";
const ERROR_MESSAGE = "FS operation failed";
const pathToFile = path.join(import.meta.dirname, FOLDER_NAME, FILE_NAME);

const create = async () => {
    open(pathToFile, "wx", (err, fd) => {
      if (err) {
        if (err.code === "EEXIST") {
          throw new Error(ERROR_MESSAGE);
        }
        throw err;
      }

      try {
        writeFile(pathToFile, content, "utf8", (err) => {
          if (err) throw err;
        });
      } finally {
        close(fd, (err) => {
          if (err) throw err;
        });
      }
    });
};

await create();
