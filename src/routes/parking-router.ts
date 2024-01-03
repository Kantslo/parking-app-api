import express from "express";
import { authMiddleware, adminMiddleware } from "../middlewares";
import { createParkingZone, createReservation, stopParking, getReservations, deleteParkingZone, createVehicle, getAllVehicles, createUser, getAllUsers, login } from "../controllers";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);
router.post("/vehicle", authMiddleware, createVehicle);
router.post("vehicles", authMiddleware, getAllVehicles);
router.post("/reservation", createReservation);
router.post("/reservation/finish", stopParking);
router.get("/reservations", authMiddleware, getReservations);
router.get("/users", adminMiddleware, getAllUsers);
router.post("/zone", adminMiddleware, createParkingZone);
router.delete("/zone/delete", adminMiddleware, deleteParkingZone);

export default router;