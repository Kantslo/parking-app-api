import { ObjectId } from "mongoose";

export interface ParkingZoneType {
  name: string;
  address: string;
  costPerHour: number;
  userId: ObjectId;
}

export interface ReservationType {
  user: string
  vehicle: string;
  parkingZone: string;
  startTime: date;
  endTime: date;
  active: boolean;
}