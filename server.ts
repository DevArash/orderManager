import { requestParser } from "./src/utils/mod.ts";
import { serve } from "https://deno.land/std/http/server.ts";
import { CenterDoit, centerFns } from "./src/functions/center/mod.ts";
import { MenuDoit, menuFns } from "./src/functions/menu/mod.ts";
import { TableDoit, tableFns } from "./src/functions/table/mod.ts";

const responseHeader: Headers = new Headers();

responseHeader.append("Contnet-Type", "application/json");

const server = serve({ port: 8000 });
console.log(`The server: http://localhost:8000`);

type model = "Testing" | "Center" | "Menu" | "Table";

for await (const req of server) {
  try {
    const response: () => Promise<any> = async () => {
      const {
        wants: { model, doit },
        details,
        context,
      } = await requestParser(req);

      return {
        ["Testing"]: async () => await console.log("Testing works"),
        ["Center"]: async () => await centerFns(doit as CenterDoit, details),
        ["Menu"]: async () => await menuFns(doit as MenuDoit, details),
        ["Table"]: async () => await tableFns(doit as TableDoit, details),
      }[model]();
    };
    req.respond({
      body: JSON.stringify({
        success: true,
        body: await response(),
      }),
      status: 200,
      headers: responseHeader,
    });
  } catch (error) {
    req.respond({
      body: JSON.stringify({
        success: false,
        body: error.message || `No valid request to the server yet ...`,
      }),
      status: 500,
      headers: responseHeader,
    });
  }
}
