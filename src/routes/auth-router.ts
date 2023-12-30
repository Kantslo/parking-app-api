import authMiddleware from "../middlewares/auth-middleware.js";
import { createUser, getAllUsers, login } from "../controllers/auth-controller.js";
import express from "express";
import { createVehicle } from "../controllers/vehicle-controller.js";
import adminMiddleware from "../middlewares/admin-middleware.js";

const authRouter = express.Router();

authRouter.post("/register", createUser);
authRouter.post("/login", login);
authRouter.post("/vehicle", authMiddleware, createVehicle);
authRouter.get("/users", adminMiddleware, getAllUsers);

export default authRouter;