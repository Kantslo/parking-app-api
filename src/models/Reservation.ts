import { Schema, model} from "mongoose";
import { ReservationType } from "../types";
import { v4 as uuid } from "uuid";

const { String } = Schema.Types;
const { Date } = Schema.Types;
const { Boolean } = Schema.Types;

const reservationSchema = new Schema<ReservationType>({
  userId: {
    type: String,
    required: true
  },
  vehiclePlateNumber: {
    type: String,
    required: true,
  },
  parkingZone: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  id: {
    type: String,
    required: true,
    default: uuid,
  },
});

const Reservation = model("Reservation", reservationSchema);

export default Reservation;
