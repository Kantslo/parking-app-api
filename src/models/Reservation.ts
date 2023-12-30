import { Schema, model} from "mongoose";
import { ReservationType } from "../types/parking-types";

const { String } = Schema.Types;
const { Date } = Schema.Types;
const { Boolean } = Schema.Types;

const reservationSchema = new Schema<ReservationType>({
  userId: {
    type: String,
  },
  vehicleId: {
    type: String,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  taken: {
    type: Boolean,
    required: true,
  }
});

const Reservation = model("Reservation", reservationSchema);

export default Reservation;
