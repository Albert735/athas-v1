export type Reminder = {
  id: string;
  note: string;

  placeId: string;
  building: string;
  buildingLatitude: number;
  buildingLongitude: number;

  dateTime: Date;
  alertNearby: boolean;
  completed: boolean;
  createdAt: Date;
};
