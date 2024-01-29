import { argv } from "node:process";

const prefix = "--";

const parseArgs = () => {
  const argsString = argv
    .slice(2)
    .reduce((acc, cur) => {
      const string = cur.startsWith(prefix)
        ? acc.concat(cur.replace(prefix, ""), " is ")
        : acc.concat(cur, ", ");
      return string;
    }, "")
    .slice(0, -2);
  console.log(argsString);
};

parseArgs();
