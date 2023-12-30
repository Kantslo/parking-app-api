import Joi, { CustomHelpers } from "joi";
import { ReservationType } from "../types/parking-types";
import Reservation from "../models/Reservation";


const ifReservationExists = (reservation: ReservationType | null) => (value: string, helpers: CustomHelpers) => {
  if (reservation) {
    return helpers.error("Parking zone is already reserved!");
  }
  return value;
}

const addReservationSchema = async (data: ReservationType) => {

  const reservation = await Reservation.findOne({ taken: data.taken });

  return Joi.object<ReservationType>({
    userId: Joi.string(),
    vehicleId: Joi.string().required(),
    parkingZone: Joi.string().required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
    taken: Joi.boolean().custom(ifReservationExists(reservation)).required(),
  })
};

export default addReservationSchema;