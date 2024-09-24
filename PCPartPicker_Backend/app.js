// app.js
import * as cfg from "./config.js";
import Fastify from "fastify";
import mercurius from "mercurius";
import cors from "@fastify/cors";
// import { schema } from "./schema.js";
// import { resolvers } from "./resolver.js";
// import { setAuthorizationHeader } from "./sharedData.js";

const app = Fastify();

app.get("/", async (request, reply) => {
  return "Hello, World!";
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

app.listen({ port: cfg.port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening at ${address}`);
});
