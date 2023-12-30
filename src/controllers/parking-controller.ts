import { Request, Response } from "express";
import ParkingZone from "../models/Parking-Zone";
import addParkingZoneSchema from "../schemas/add-parkingZone-schema";
import addReservationSchema from "../schemas/add-reservation-schema";
import Reservation from "../models/Reservation";
import User from "../models/User";



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

    const { userId, vehicleId, parkingZone } = value;

    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const parkingLot = await ParkingZone.findOne({ name: parkingZone  });

    console.log(parkingLot);

    if (!parkingLot) {
      return res.status(404).json({ message: 'Parking Zone not found' });
    }

    const hourlyCost = parkingLot.costPerHour;
    const cost = (endTime.getTime() - startTime.getTime()) / (60 * 60 * 1000) * hourlyCost;

    if (user.balance < cost) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    user.balance -= cost;

    await user.save()

    const newReservation = new Reservation({
      userId,
      vehicleId,
      parkingZone,
      startTime,
      endTime,
    });

    await newReservation.save();

  } catch (error) {
    return res.status(401).json(error);
  }
}