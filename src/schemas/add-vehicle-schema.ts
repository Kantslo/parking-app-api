import Joi, { CustomHelpers } from "joi";
import { VehicleType } from "types";
import { Vehicle } from "../models";

const ifVehicleExists = (vehicle: VehicleType | null) => (value: string, helpers: CustomHelpers) => {
  if (vehicle) {
    helpers.error("Vehicle with this state number already exists!");
  }
  return value;
};

const addVehicleSchema = async (data: VehicleType) => {
  const vehicle = await Vehicle.findOne({ plateNumber: data.plateNumber });

  return Joi.object<VehicleType>({
    name: Joi.string().min(4).required(),
    plateNumber: Joi.string().min(6).custom(ifVehicleExists(vehicle)).required(),
    carType: Joi.string().min(2).required(),
    userId: Joi.string(),
  });
};

export default addVehicleSchema;
