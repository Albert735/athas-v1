export interface ScheduledClass {
  id: string;
  course: string;
  code: string;
  building: string;
  hall: string;
  lecturer: string;
  day: string;
  startTime: string;
  endTime: string;
  repeatEnabled: boolean;
  repeatType: string;
}
