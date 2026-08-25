export interface ScheduledClass {
  id: string;
  course: string;
  code: string;
  startTime: string;
  endTime: string;
  hall: string;
  building: string;
  day: string;
  repeatEnabled: boolean;
  repeatType: string;
}
