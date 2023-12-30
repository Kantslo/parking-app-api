import { Schema, model } from 'mongoose';
import { VehicleType } from 'types/vehicle-types';

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
  userId: {
    type: Schema.Types.String,
    required: true,
  }
});

const Vehicle = model('Vehicle', vehicleSchema);

export default Vehicle;