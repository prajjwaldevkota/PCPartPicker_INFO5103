import { config } from "dotenv";
config();
export const collection = process.env.AUTH;
export const PORT = process.env.PORT || 3045;
export const graphql = process.env.GRAPHQLURL;
export const appdb = process.env.DB;
export const userAuth = process.env.DBURL;