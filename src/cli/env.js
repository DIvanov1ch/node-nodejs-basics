const prefix = "RSS_";

const parseEnv = () => {
  const variableNames = Object.keys(process.env).filter((key) =>
    key.startsWith(prefix)
  );
  const variables = variableNames
    .map((name) => `${name}=${process.env[`${name}`]}`)
    .join("; ");
  console.log(variables);
};

parseEnv();
