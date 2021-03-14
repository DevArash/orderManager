import { requestParser } from "./src/utils/mod.ts";
import { serve } from "https://deno.land/std/http/server.ts";
import { CenterDoit, centerFns } from "./src/functions/center/mod.ts";
import { MenuDoit, menuFns } from "./src/functions/menu/mod.ts";
import { TableDoit, tableFns } from "./src/functions/table/mod.ts";
import { DishDoit, dishFns } from "./src/functions/dish/mod.ts";
import { OrderDoit, orderFns } from "./src/functions/order/mod.ts";
import { UserDoit, userFns } from "./src/functions/user/mod.ts";
import { CountryDoit, countryFns } from "./src/functions/country/mod.ts";
import { StateDoit, stateFns } from "./src/functions/state/mod.ts";
import { CityDoit, cityFns } from "./src/functions/city/mod.ts";
import { ParishDoit, parishFns } from "./src/functions/parish/mod.ts";

const responseHeader: Headers = new Headers();

responseHeader.append("Contnet-Type", "application/json");

const server = serve({ port: 8000 });
console.log(`The server: http://localhost:8000`);

type model =
  | "Testing"
  | "Center"
  | "Menu"
  | "Table"
  | "Dish"
  | "Order"
  | "User"
  | "Country"
  | "State"
  | "City"
  | "Parish";

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
        ["Table"]: async () => await tableFns(doit as TableDoit, details),
        ["Menu"]: async () => await menuFns(doit as MenuDoit, details),
        ["Order"]: async () => await orderFns(doit as OrderDoit, details),
        ["Dish"]: async () => await dishFns(doit as DishDoit, details),
        ["User"]: async () => await userFns(doit as UserDoit, details),
        ["Country"]: async () => await countryFns(doit as CountryDoit, details),
        ["State"]: async () => await stateFns(doit as StateDoit, details),
        ["City"]: async () => await cityFns(doit as CityDoit, details),
        ["Parish"]: async () => await parishFns(doit as ParishDoit, details),
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
