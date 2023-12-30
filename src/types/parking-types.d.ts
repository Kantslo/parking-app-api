export interface ParkingZoneType {
  name: string;
  address: string;
  costPerHour: number;
}

export interface ReservationType {
  userId: string;
  vehicleId: string;
  parkingZone: string;
  startTime: Date;
  endTime: Date;
  taken: boolean;
}