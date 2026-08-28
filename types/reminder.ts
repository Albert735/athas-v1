export type Reminder = {
  id: string;
  note: string;
  building: string;
  latitude: number;
  longitude: number;
  dateTime: Date;
  alertNearby: boolean;
  completed: boolean;
  createdAt: Date;
};
