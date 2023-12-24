import authMiddleware from "middlewares/auth-middleware.js";
import { createUser, getAllUsers, login } from "../controllers/auth-controller.js";
import express from "express";

const parkingRouter = express.Router();

parkingRouter.post("/register", createUser);
parkingRouter.post("/login", login);
parkingRouter.get("/users", authMiddleware, getAllUsers);

export default parkingRouter;