// app.js
import * as cfg from "./config.js";
import Fastify from "fastify";
import mercurius from "mercurius";
import cors from "@fastify/cors";
import { schema } from "./schema.js";
import { resolvers } from "./resolver.js";
import { setAuthorizationHeader } from "./sharedData.js";

const app = Fastify();
app.register(cors, {});
app.register(mercurius, {
  schema,
  resolvers,
  context: (request, reply) => {
    return { request, reply };
  },
  graphiql: true,
});

//commented out for testing purposes, will use for authentication purposes for registered users in the future
app.addHook("preHandler", async (request, reply) => {
  // Access the authorization header from the request
  const authorizationHeader = request.headers["authorization"];

  // Store the authorization header using the shared data module
  setAuthorizationHeader(authorizationHeader);
});

app.listen({ port: cfg.PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening at ${address}`);
});