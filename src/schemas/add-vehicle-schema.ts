import Joi, { CustomHelpers } from "joi";
import Vehicle from "../models/Vehicle.js";
import { VehicleType } from "types/vehicle-types.js";

const ifVehicleExists = (vehicle: VehicleType | null) => (value: string, helpers: CustomHelpers) => {
  if (vehicle) {
    helpers.error("Vehicle with this state number already exists!");
  }
  return value;
};

const addVehicleSchema = async (data: VehicleType) => {
  const existingVehicle = await Vehicle.findOne({ plateNumber: data.plateNumber });

  return Joi.object<VehicleType>({
    name: Joi.string().min(4).required(),
    plateNumber: Joi.string().min(6).custom(ifVehicleExists(existingVehicle)).required(),
    carType: Joi.string().min(2).required(),
  });
};

export default addVehicleSchema;
