import { DenonConfig } from "https://deno.land/x/denon@2.4.7/mod.ts";

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: "deno run server.ts",
      desc: "run my app.ts file",
      allow: ["env", "write", "net"],
      watch: true,
    },
  },
};

export default config;
