import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./config/mongo.js";
import swaggerMiddleware from "./middlewares/swagger-middleware.js";
import parkingRouter from "./routes/parking-router.js";

dotenv.config();
connect();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api", parkingRouter);

app.use("/", ...swaggerMiddleware);

app.listen(process.env.PORT || 3000);