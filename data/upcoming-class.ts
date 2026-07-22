import type { ScheduledClass } from "@/types/class";

export const MOCK_UPCOMING_CLASS: ScheduledClass[] = [
  {
    id: "1",
    course: "Machine Learning",
    code: "DCIT 407",
    time: "9:30 - 11:20",
    room: "Room 2",
    building: "NNB",
    lecturer: "Dr. Mensah",
    day: "Monday",
  },

  {
    id: "2",
    course: "Database Systems",
    code: "DCIT 305",
    time: "12:30 - 2:20",
    room: "Lab 1",
    building: "CS Block",
    lecturer: "Dr. Owusu",
    day: "Tuesday",
  },

  {
    id: "3",
    course: "Computer Networks",
    code: "DCIT 306",
    time: "3:00 - 4:50",
    room: "Room 5",
    building: "NNB",
    lecturer: "Dr. Arthur",
    day: "Wednesday",
  },

  {
    id: "4",
    course: "Software Engineering",
    code: "DCIT 402",
    time: "8:00 - 9:50",
    room: "Room 10",
    building: "CS Block",
    lecturer: "Dr. Boateng",
    day: "Friday",
  },
];
