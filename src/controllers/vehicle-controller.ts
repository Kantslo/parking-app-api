import { Request, Response } from "express";
import Vehicle from "../models/Vehicle.js";
import addVehicleSchema from "../schemas/add-vehicle-schema.js";

export const createVehicle = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const validator = await addVehicleSchema(body);
    const { value, error } = validator.validate(body);

    if (error) {
      return res.status(400).json(error.details);
    }

    const { name, plateNumber, carType } = value;


    const existingVehicle = await Vehicle.findOne({ plateNumber });

    if (existingVehicle) {
      return res.status(400).json("This vehicle has already been added!");
    }

    const newVehicle = new Vehicle({
      name,
      plateNumber,
      carType,
    });

    await newVehicle.save();

    return res.status(201).json(newVehicle);
  } catch (error) {
    return res.status(401).json(error);
  }
};