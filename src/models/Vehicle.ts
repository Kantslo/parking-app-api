import { Schema, model } from 'mongoose';
import { VehicleType } from 'types/vehicle-types';
import { v4 as uuid } from "uuid";

const { String } = Schema.Types;

const vehicleSchema = new Schema<VehicleType>({
  name: {
    type: String, 
    required: true
  },
  plateNumber: {
    type: String,
    required: true
  },
  carType: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true,
    default: uuid
  }
});

const Vehicle = model('Vehicle', vehicleSchema);

export default Vehicle;