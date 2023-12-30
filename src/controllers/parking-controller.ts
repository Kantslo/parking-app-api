import { Request, Response } from "express";
import ParkingZone from "../models/Parking-Zone";
import addParkingZoneSchema from "../schemas/add-parkingZone-schema";
import addReservationSchema from "../schemas/add-reservation-schema";
import Reservation from "../models/Reservation";

export const createParkingZone = async (req: Request, res: Response) => {

  const { body } = req;

  try {
    
    const validator = await addParkingZoneSchema(body);

    const { value, error } = validator.validate(body);

    if (error) {
      return res.status(400).json(error.details);
    }

    const { name, address, costPerHour } = value;

    const parkingZone = await ParkingZone.findOne({ name });

    if (parkingZone) {
      return res.status(400).json("Parking zone already exists!")
    }

    const newParkingZone = new ParkingZone({
      name,
      address,
      costPerHour,
    })

    await newParkingZone.save();

    return res.status(201).json(newParkingZone);
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const createReservation = async (req: Request, res: Response) => {

  const { body } = req;

  try {
    
    const validator = await addReservationSchema(body);

    const { value, error } = validator.validate(body);

    if (error) {
      return res.status(401).json(error);
    }

    const { user, vehicle, parkingZone } = value;

    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);


    const newReservation = new Reservation({
      user,
      vehicle,
      parkingZone,
      startTime,
      endTime,
    });

    await newReservation.save();

  } catch (error) {
    return res.status(401).json(error);
  }
}