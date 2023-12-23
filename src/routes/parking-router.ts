import { createUser } from "../controllers/auth-controller.js";
import express from "express";

const parkingRouter = express.Router();

parkingRouter.post("/register", createUser);
parkingRouter.post("/login", );