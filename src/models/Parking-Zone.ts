import { Schema, model } from "mongoose";
import { ParkingZoneType } from "../types";
import { v4 as uuid } from "uuid";

const { String } = Schema.Types;
const { Number } = Schema.Types;

const parkingZoneSchema = new Schema<ParkingZoneType>({
  id: {
    type: String,
    required: true,
    default: uuid,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  costPerHour: {
    type: Number,
    required: true,
  }
});

const ParkingZone = model("ParkingZone", parkingZoneSchema);

export default ParkingZone;