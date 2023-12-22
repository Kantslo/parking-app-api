import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT || 3000);