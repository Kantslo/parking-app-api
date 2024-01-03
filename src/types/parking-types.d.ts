import { ObjectId } from "mongoose";

export interface ParkingZoneType {
  id: string;
  name: string;
  address: string;
  costPerHour: number;
  userId: ObjectId;
}

export interface ReservationType {
  userId: string
  vehiclePlateNumber: string;
  parkingZone: string;
  startTime: date;
  endTime: date;
  active: boolean;
  id: string;
}