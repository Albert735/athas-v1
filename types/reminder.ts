export type Reminder = {
  id: string;
  note: string;
  building: string;
  latitude: number;
  longitude: number;
  dateTime: Date | null;
  alertNearby: boolean;
  completed: boolean;
  createdAt: Date;
};
