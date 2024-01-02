import Joi, { CustomHelpers } from "joi";
import { ParkingZoneType } from "../types";
import { ParkingZone } from "../models"

const ifParkingZoneExists = (parkingZone: ParkingZoneType | null) => (value: string, helpers: CustomHelpers) => {
  if (parkingZone) {
    helpers.error("Parking zone with this value already exists!")
  }

  return value;
};

const addParkingZoneSchema = async (data: ParkingZoneType) => {

  const parkingZone = await ParkingZone.findOne({name: data.name});

  return Joi.object<ParkingZoneType>({
    name: Joi.string().min(3).max(5).custom(ifParkingZoneExists(parkingZone)).required(),
    address: Joi.string().max(60).required(),
    costPerHour: Joi.number().required(),
  })
};

export default addParkingZoneSchema;

