export const CATEGORIES = [
  { id: "library", label: "Libraries" },
  { id: "lecture-hall", label: "Lecture Halls" },
  { id: "lab", label: "Labs" },
  { id: "cafeteria", label: "Cafeterias" },
  { id: "coffee", label: "Coffee" },
  { id: "gym", label: "Gym" },
  { id: "clinic", label: "Clinics" },
  { id: "bank", label: "Banks" },
  { id: "atm", label: "ATMs" },
  { id: "shuttle", label: "Shuttle" },
  { id: "printing", label: "Printing" },
  { id: "office", label: "Offices" },
  { id: "restroom", label: "Restrooms" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];
