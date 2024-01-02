import { Schema, model} from "mongoose";
import { ReservationType } from "../types";

const { String } = Schema.Types;
const { Date } = Schema.Types;
const { Boolean } = Schema.Types;

const reservationSchema = new Schema<ReservationType>({
  user: {
    type: String,
    required: true
  },
  vehicle: {
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
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  }
});

const Reservation = model("Reservation", reservationSchema);

export default Reservation;
