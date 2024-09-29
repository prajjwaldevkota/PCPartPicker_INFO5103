// app.js
import * as cfg from "./config.js";
import Fastify from "fastify";
import mercurius from "mercurius";
import cors from "@fastify/cors";
import * as dbRtns from "./dbRoutines.js";
// import { schema } from "./schema.js";
// import { resolvers } from "./resolver.js";
// import { setAuthorizationHeader } from "./sharedData.js";

const app = Fastify();

app.get("/", async (request, reply) => {
  return "Hello, World!";
});

app.get("/testdb", async (request, reply) => {
  try {
    const db = await dbRtns.getDBInstance();
    if (db) {
      return "Connected to database";
    } else {
      return "Error connecting to database" + db;
    }
  } catch (err) {
    console.log(err);
  }
});

// app.register(cors, {});

// app.register(mercurius, {
// //   schema,
// //   resolvers,
//   context: (request, reply) => {
//     return { request, reply };
//   },
// //   graphiql: true,
// });

app.listen({ port: cfg.PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening at ${address}`);
});
