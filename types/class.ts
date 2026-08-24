export interface ScheduledClass {
  id: string;
  course: string;
  code: string;
  startTime: string;
  endTime: string;
  room: string;
  building: string;
  day: string;
  repeatEnabled: boolean;
  repeatType: string;
}
