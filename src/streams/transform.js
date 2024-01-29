import { stdin, stdout } from "process";
import { Transform } from "node:stream";

const transform = async () => {
  const reverse = new Transform({
    transform(data, _encoding, callback) {
      const reversedData = data
        .toString()
        .split("")
        .reverse()
        .join("")
        .concat("\n");
      callback(null, reversedData);
    },
  });
  stdin.pipe(reverse).pipe(stdout);
};

await transform();
