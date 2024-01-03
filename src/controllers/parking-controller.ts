import { Request, Response } from "express";
import { ParkingZone, Reservation, User } from "../models";
import { addParkingZoneSchema, addReservationSchema } from "../schemas"
import cron from "node-cron";

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

export const editParkingZone = async (req: Request, res: Response) => {

  const { zoneId, name, address, costPerHour } = req.body;

  try {
    const parkingZone = await ParkingZone.findOne({ zoneId });

    if (!parkingZone) {
      return res.status(404).json({ message: 'Parking zone not found' });
    }

    const updatedZone = await ParkingZone.findByIdAndUpdate(zoneId, {
      name,
      address,
      costPerHour,
    }, { new: true });

    await updatedZone!.save();

    return res.status(200).json(updatedZone);
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

    const { userId, vehiclePlateNumber, parkingZone, startTime } = value;

    const reservation = await Reservation.findOne({ userId, active: true });

    if (reservation) {
      return res.status(401).json("Reservation already exists!");
    }

    const zone = await ParkingZone.findOne({ name: parkingZone });

    if (!zone) {
      return res.status(404).json("Parking zone not found");
    }

    const user = await User.findOne({ id: userId });

    if (!user) {
      return res.status(404).json("User not found");
    }

    const currentTime = new Date();

    cron.schedule('*/10 * * * *', async () => {
      if (currentTime > startTime) {
        const timeDifference = currentTime.getTime() - startTime;
        const hoursParked = timeDifference / (1000 * 60 * 60);
        const parkingCost = zone.costPerHour * hoursParked;
  
        const newReservation = new Reservation({
          userId,
          vehiclePlateNumber,
          parkingZone,
          startTime,
          status: true,
        });
  
        if (user.balance < parkingCost) {
          newReservation.active = false;
          await newReservation.save();
          return res.status(201).json("Not enough money to cover the parking cost");
        }
  
        user.balance -= parkingCost;
        console.log(`Successfully deducted ${parkingCost} from user ${user.id}'s balance.`);
  
        await user.save();
  
        await newReservation.save();
  
        if (newReservation.active === false) {
          return res.status(201).json("Parking stopped");
        }
  
        return res.status(201).json(newReservation);
      } else {
        return res.status(400).json({ message: "Invalid start time for parking" });
      }
    });

  } catch (error) {
    return res.status(401).json(error);
  }
};

export const stopParking = async (req: Request, res: Response) => {
  const { reservationId } = req.body;

  try {
    const reservation = await Reservation.findOne({ id: reservationId });

    if (!reservation) {
      return res.status(404).json("Reservation not found");
    }

    if (reservation.active === false) {
      return res.status(400).json("Parking is already stopped");
    }

    reservation.active = false;
    reservation.endTime = new Date();
    await reservation.save();

    return res.status(200).json(reservation);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getReservations = async (_: Request, res: Response) => {
  try {
    const reservations = await Reservation.find();

    return res.status(200).json(reservations);
  } catch (error) {
    return res.status(500).json(error);
  }
};
