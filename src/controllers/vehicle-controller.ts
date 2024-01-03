import { Request, Response } from "express";
import { Vehicle } from "../models";
import { addVehicleSchema } from "../schemas";

export const createVehicle = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const validator = await addVehicleSchema(body);
    const { value, error } = validator.validate(body);

    if (error) {
      return res.status(400).json(error.details);
    }

    const { name, plateNumber, carType, userId } = value;


    const vehicle = await Vehicle.findOne({ plateNumber });

    if (vehicle) {
      return res.status(400).json("This vehicle has already been added!");
    }

    const newVehicle = new Vehicle({
      name,
      plateNumber,
      carType,
      userId,
    });

    await newVehicle.save();

    return res.status(201).json(newVehicle);
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const deleteVehicle = async (req: Request, res: Response) => {

  const { vehicleId } = req.body;

  try {
    
    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    await Vehicle.findByIdAndDelete({ vehicleId });

    return res.status(200).json("Vehicle deleted successfully");

  } catch (error) {
    return res.status(400).json(error);
  }

}

export const getAllVehicles = async (_: Request, res: Response) => {
  try {
    const vehicles = await Vehicle.find();

    return res.status(200).json(vehicles);
  } catch (error) {
    return res.status(400).json(error);
  }
};