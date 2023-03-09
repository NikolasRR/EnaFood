import express, { json } from "express";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import cors from "cors";
import "express-async-errors";

const env = dotenv.config();
dotenvExpand.expand(env);

const app = express()
    .use(cors())
    .use(json())

export default app;