import authMiddleware from "../middlewares/auth-middleware.js";
import { createAdmin, createUser, getAllUsers, login } from "../controllers/auth-controller.js";
import express from "express";
import { createVehicle } from "../controllers/vehicle-controller.js";

const authRouter = express.Router();

authRouter.post("/user", createUser);
authRouter.post("/admin", createAdmin);
authRouter.post("/login", login);
authRouter.post("/vehicle", createVehicle)
authRouter.get("/users", authMiddleware, getAllUsers);

export default authRouter;