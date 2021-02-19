import { MongoClient } from "https://deno.land/x/mongo@v0.21.2/mod.ts";

const client = new MongoClient();
// await client.connect("mongodb://localhost:27017");
const db = await client.connect("mongodb://localhost:27017/food");

export * from "https://deno.land/x/mongo@v0.21.2/mod.ts";

export default db;