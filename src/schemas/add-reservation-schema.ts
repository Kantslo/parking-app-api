import Joi, { CustomHelpers } from "joi";
import { ReservationType } from "../types";
import { Reservation } from "../models";


const ifReservationExists = (reservation: ReservationType | null) => (value: string, helpers: CustomHelpers) => {
  if (reservation) {
    return helpers.error("Reservation is already made!");
  }
  return value;
}

const addReservationSchema = async (data: any) => {

  const reservation = await Reservation.findOne({ taken: data.active });

  return Joi.object({
    userId: Joi.string().required(),
    vehiclePlateNumber: Joi.string().required(),
    parkingZone: Joi.string().required(),
    startTime: Joi.date().required(),
    active: Joi.boolean().custom(ifReservationExists(reservation)),
  })
};

export default addReservationSchema;