import express from "express";
import authMiddleware from "../middlewares/auth-middleware.js";
import adminMiddleware from "../middlewares/admin-middleware.js";
import { createUser, getAllUsers, login } from "../controllers/auth-controller.js";
import { createVehicle } from "../controllers/vehicle-controller.js";
import { createParkingZone } from "../controllers/parking-controller.js";

const parkingRouter = express.Router();

parkingRouter.post("/register", createUser);
parkingRouter.post("/login", login);
parkingRouter.post("/vehicle", authMiddleware, createVehicle);
parkingRouter.get("/users", adminMiddleware, getAllUsers);
parkingRouter.post("/zone", adminMiddleware, createParkingZone);

export default parkingRouter;