export interface ScheduledClass {
  id: string;
  course: string;
  code: string;
  startTime: string;
  endTime: string;
  hall: string;

  buildingId: string;
  building: string;

  buildingLatitude: number;
  buildingLongitude: number;

  day: string;
  repeatEnabled: boolean;
  repeatType: string;
}
