import type { CategoryId } from "./categories";

export const places: {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
  distance: string;
  latitude: number;
  longitude: number;
  hours: string;
  days: string;
  isOpen: boolean;
}[] = [
  // BANKS
  {
    id: "1",
    name: "GCB Bank",
    category: "bank",
    description:
      "Full-service GCB Bank branch offering student account services, withdrawals, and deposits.",
    distance: "0.4 km",
    latitude: 5.6508,
    longitude: -0.1869,
    hours: "8:00 AM - 4:00 PM",
    days: "Mon - Fri",
    isOpen: true,
  },
  {
    id: "2",
    name: "Ecobank",
    category: "bank",
    description:
      "Ecobank branch near campus with ATM services and student banking support.",
    distance: "0.8 km",
    latitude: 5.6515,
    longitude: -0.1875,
    hours: "8:30 AM - 4:30 PM",
    days: "Mon - Fri",
    isOpen: true,
  },
  {
    id: "3",
    name: "Stanbic Bank",
    category: "bank",
    description:
      "Stanbic Bank branch near campus offering personal and student banking services.",
    distance: "1.0 km",
    latitude: 5.6499,
    longitude: -0.1872,
    hours: "8:00 AM - 3:30 PM",
    days: "Mon - Fri",
    isOpen: false,
  },

  // LIBRARIES
  {
    id: "4",
    name: "Balme Library",
    category: "library",
    description:
      "The main university library offering quiet study spaces, research resources, and access to digital archives.",
    distance: "0.6 km",
    latitude: 5.6501,
    longitude: -0.1861,
    hours: "7:00 AM - 10:00 PM",
    days: "Mon - Sat",
    isOpen: true,
  },
  {
    id: "5",
    name: "Law Library",
    category: "library",
    description:
      "Dedicated library serving the School of Law with legal texts, journals, and research support.",
    distance: "0.9 km",
    latitude: 5.6512,
    longitude: -0.1854,
    hours: "8:00 AM - 9:00 PM",
    days: "Mon - Sat",
    isOpen: true,
  },

  // CLINICS
  {
    id: "6",
    name: "University Health Services",
    category: "clinic",
    description:
      "Primary health facility on campus providing general consultations, emergency care, and student wellness services.",
    distance: "0.7 km",
    latitude: 5.6521,
    longitude: -0.1868,
    hours: "24 hours",
    days: "Every day",
    isOpen: true,
  },
  {
    id: "7",
    name: "Campus Medical Centre",
    category: "clinic",
    description:
      "Medical centre offering consultations, pharmacy services, and health checks for students and staff.",
    distance: "1.1 km",
    latitude: 5.6495,
    longitude: -0.1881,
    hours: "8:00 AM - 6:00 PM",
    days: "Mon - Sat",
    isOpen: true,
  },

  // RESTROOMS
  {
    id: "8",
    name: "Balme Library Restroom",
    category: "restroom",
    description:
      "Public restroom facility located near Balme Library, accessible to all students.",
    distance: "0.6 km",
    latitude: 5.6502,
    longitude: -0.186,
    hours: "7:00 AM - 10:00 PM",
    days: "Every day",
    isOpen: true,
  },
  {
    id: "9",
    name: "Great Hall Restroom",
    category: "restroom",
    description:
      "Restroom facility near the Great Hall, available during campus operating hours.",
    distance: "0.8 km",
    latitude: 5.6492,
    longitude: -0.1865,
    hours: "7:00 AM - 8:00 PM",
    days: "Every day",
    isOpen: true,
  },

  // LABS
  {
    id: "10",
    name: "Computer Science Lab",
    category: "lab",
    description:
      "Fully equipped computer laboratory for programming coursework, research, and student projects.",
    distance: "0.5 km",
    latitude: 5.651,
    longitude: -0.1858,
    hours: "8:00 AM - 8:00 PM",
    days: "Mon - Sat",
    isOpen: true,
  },
  {
    id: "11",
    name: "Networking Lab",
    category: "lab",
    description:
      "Specialized laboratory for networking, systems administration, and hands-on infrastructure training.",
    distance: "0.7 km",
    latitude: 5.6514,
    longitude: -0.1864,
    hours: "9:00 AM - 6:00 PM",
    days: "Mon - Fri",
    isOpen: false,
  },

  // LECTURE HALLS
  {
    id: "12",
    name: "Great Hall",
    category: "lecture-hall",
    description:
      "The university's largest venue, hosting major lectures, graduations, and campus-wide events.",
    distance: "0.8 km",
    latitude: 5.649,
    longitude: -0.1866,
    hours: "7:00 AM - 9:00 PM",
    days: "Mon - Sat",
    isOpen: true,
  },
  {
    id: "13",
    name: "JQB",
    category: "lecture-hall",
    description:
      "Multi-purpose lecture hall used for undergraduate and postgraduate classes across departments.",
    distance: "0.6 km",
    latitude: 5.6507,
    longitude: -0.1855,
    hours: "7:00 AM - 8:00 PM",
    days: "Mon - Sat",
    isOpen: true,
  },

  // GYM
  {
    id: "14",
    name: "University Gym",
    category: "gym",
    description:
      "Campus fitness and recreation centre with cardio equipment, weights, and group fitness classes.",
    distance: "1.0 km",
    latitude: 5.6489,
    longitude: -0.1878,
    hours: "6:00 AM - 9:00 PM",
    days: "Every day",
    isOpen: true,
  },

  // CAFETERIA
  {
    id: "15",
    name: "Legon Hall Cafeteria",
    category: "cafeteria",
    description:
      "Popular dining hall serving hot meals, snacks, and beverages throughout the day.",
    distance: "0.9 km",
    latitude: 5.6497,
    longitude: -0.1849,
    hours: "6:30 AM - 9:00 PM",
    days: "Every day",
    isOpen: true,
  },
  {
    id: "16",
    name: "Commonwealth Cafeteria",
    category: "cafeteria",
    description:
      "Spacious student dining area known for its variety of local and continental dishes.",
    distance: "1.2 km",
    latitude: 5.6518,
    longitude: -0.1848,
    hours: "7:00 AM - 8:30 PM",
    days: "Every day",
    isOpen: true,
  },

  // COFFEE
  {
    id: "17",
    name: "Campus Coffee Shop",
    category: "coffee",
    description:
      "Cozy coffee shop offering espresso drinks, pastries, and light meals for students on the go.",
    distance: "0.5 km",
    latitude: 5.6504,
    longitude: -0.1852,
    hours: "7:00 AM - 7:00 PM",
    days: "Mon - Sat",
    isOpen: true,
  },
  {
    id: "18",
    name: "Balme Café",
    category: "coffee",
    description:
      "Quiet café near the library, perfect for coffee breaks between study sessions.",
    distance: "0.7 km",
    latitude: 5.65,
    longitude: -0.1863,
    hours: "8:00 AM - 6:00 PM",
    days: "Mon - Sat",
    isOpen: false,
  },

  // SHUTTLE
  {
    id: "19",
    name: "Main Gate Shuttle Stop",
    category: "shuttle",
    description:
      "Primary shuttle pickup and drop-off point at the university's main entrance.",
    distance: "1.0 km",
    latitude: 5.6485,
    longitude: -0.1869,
    hours: "6:00 AM - 10:00 PM",
    days: "Every day",
    isOpen: true,
  },
  {
    id: "20",
    name: "Balme Shuttle Stop",
    category: "shuttle",
    description:
      "Shuttle stop conveniently located near Balme Library for easy campus commuting.",
    distance: "0.6 km",
    latitude: 5.6503,
    longitude: -0.1862,
    hours: "6:00 AM - 10:00 PM",
    days: "Every day",
    isOpen: true,
  },

  // PRINTING
  {
    id: "21",
    name: "Campus Printing Centre",
    category: "printing",
    description:
      "Full-service printing, photocopying, and document binding for students and staff.",
    distance: "0.5 km",
    latitude: 5.6509,
    longitude: -0.1857,
    hours: "8:00 AM - 6:00 PM",
    days: "Mon - Sat",
    isOpen: true,
  },
  {
    id: "22",
    name: "JQB Printing Shop",
    category: "printing",
    description:
      "Convenient printing and photocopying services located near JQB lecture halls.",
    distance: "0.7 km",
    latitude: 5.6506,
    longitude: -0.1853,
    hours: "8:00 AM - 5:00 PM",
    days: "Mon - Fri",
    isOpen: false,
  },

  // ATMs
  {
    id: "23",
    name: "GCB ATM",
    category: "atm",
    description:
      "24-hour GCB Bank automated teller machine for quick cash withdrawals.",
    distance: "0.4 km",
    latitude: 5.6507,
    longitude: -0.1868,
    hours: "24 hours",
    days: "Every day",
    isOpen: true,
  },
  {
    id: "24",
    name: "Ecobank ATM",
    category: "atm",
    description:
      "24-hour Ecobank automated teller machine accessible to all students and staff.",
    distance: "0.8 km",
    latitude: 5.6514,
    longitude: -0.1874,
    hours: "24 hours",
    days: "Every day",
    isOpen: true,
  },

  // OFFICES
  {
    id: "25",
    name: "Department of Computer Science",
    category: "office",
    description:
      "Administrative offices for the Computer Science department, handling student inquiries and academic records.",
    distance: "0.5 km",
    latitude: 5.6511,
    longitude: -0.1859,
    hours: "8:00 AM - 5:00 PM",
    days: "Mon - Fri",
    isOpen: true,
  },
  {
    id: "26",
    name: "Academic Affairs Office",
    category: "office",
    description:
      "Central office handling academic administration, registration, and student services.",
    distance: "0.9 km",
    latitude: 5.6505,
    longitude: -0.1871,
    hours: "8:00 AM - 4:30 PM",
    days: "Mon - Fri",
    isOpen: false,
  },
];
