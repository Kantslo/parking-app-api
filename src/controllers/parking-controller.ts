import { Request, Response } from "express";
import { ParkingZone, Reservation } from "../models";
import { addParkingZoneSchema, addReservationSchema } from "../schemas"

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

export const deleteParkingZone = async (req: Request, res: Response) => {

  const { name } = req.body;

  try {

    const parkingZone = await ParkingZone.findOne({ name });

    if (!parkingZone) {
      return res.status(404).json({ message: 'Parking zone not found' });
    }

    await ParkingZone.findOneAndDelete({ name });

    return res.status(200).json("Parking zone deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
}

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