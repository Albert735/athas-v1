export type Reminder = {
  id: string;
  note: string;
  building: string;
  dateTime?: Date;
  alertNearby: boolean;
  completed: boolean;
  createdAt: Date;
};
