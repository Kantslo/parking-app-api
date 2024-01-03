import { Schema, model } from 'mongoose';
import { VehicleType } from '../types';
import { v4 as uuid } from 'uuid';

const { String } = Schema.Types;

const vehicleSchema = new Schema<VehicleType>({
  id: {
    type: String,
    required: true,
    default: uuid,
  },
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
  userId: {
    type: Schema.Types.String,
    required: true,
  }
});

const Vehicle = model('Vehicle', vehicleSchema);

export default Vehicle;