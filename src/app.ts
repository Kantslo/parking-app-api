import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import connect from "./config/mongo.js";

dotenv.config();
connect();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT || 3000);