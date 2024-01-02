import express from "express";
import { authMiddleware, adminMiddleware } from "../middlewares";
import { createParkingZone, createReservation, deleteParkingZone, createVehicle, createUser, getAllUsers, login } from "../controllers";

const parkingRouter = express.Router();

parkingRouter.post("/register", createUser);
parkingRouter.post("/login", login);
parkingRouter.post("/vehicle", authMiddleware, createVehicle);
parkingRouter.post("/reservation", authMiddleware, createReservation);
parkingRouter.get("/users", adminMiddleware, getAllUsers);
parkingRouter.post("/zone", adminMiddleware, createParkingZone);
parkingRouter.delete("/zone/delete", adminMiddleware, deleteParkingZone);

export default parkingRouter;