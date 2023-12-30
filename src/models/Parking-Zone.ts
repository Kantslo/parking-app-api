import { Schema, model } from "mongoose";
import { ParkingZone } from "../types/parking-types";

const { String } = Schema.Types;

const parkingZoneSchema = new Schema<ParkingZone>({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  costPerHour: {
    type: Schema.Types.Number,
    required: true,
  }
});

const ParkingZone = model("ParkingZone", parkingZoneSchema);

export default parkingZoneSchema;