import { Schema, model } from "mongoose";
import { ParkingZoneType } from "../types/parking-types";

const { String } = Schema.Types;
const { Number } = Schema.Types;

const parkingZoneSchema = new Schema<ParkingZoneType>({
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