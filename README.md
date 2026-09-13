# Raute

## Campus Navigation, Built for Students.

Raute is a mobile campus navigation platform designed to help university students find locations, navigate campus, manage their class schedules, and get to their destinations efficiently.

The application combines interactive maps, location search, walking directions, timetable management, and navigation into a single mobile experience.

---

## Overview

Navigating a large university campus can be difficult, particularly for new students and visitors. Finding buildings, locating facilities, and getting to classes on time often requires relying on unfamiliar landmarks or asking for directions.

Raute addresses this problem by providing a centralized campus navigation experience.

Users can:

- Search for campus buildings and facilities
- Explore important locations around campus
- View detailed information about places
- Get walking directions between locations
- Follow step-by-step navigation
- Use voice-guided navigation
- Create and manage class schedules
- Associate classes with campus buildings
- Navigate directly to scheduled classes
- Access an "I'm Late" navigation experience
- Receive campus alerts
- Explore campus through an interactive map

---

## Core Features

### Interactive Campus Map

The map is the central component of Raute and provides an interactive view of the university campus.

Users can:

- Explore campus locations
- Search for places
- Filter locations by category
- Select buildings and facilities
- View location details
- Generate walking routes
- Start navigation to a destination

The map experience is powered by Mapbox.

---

### Location Search

Raute provides search and category-based discovery for campus locations.

Supported location types include:

- Buildings
- Lecture halls
- Libraries
- Banks
- Clinics
- Laboratories
- Restrooms
- Cafés
- Printing locations
- Bus stops
- Other campus facilities

---

### Point-to-Point Navigation

Users can select a destination and generate a walking route from their current location.

Navigation provides:

- Route visualization
- Walking distance
- Estimated travel time
- Step-by-step directions
- Navigation progress
- Voice guidance

Routing is handled through the Mapbox Directions API.

---

### Voice-Guided Navigation

Raute is designed to support hands-free navigation through spoken turn-by-turn instructions.

This allows users to navigate campus without constantly looking at their phone while walking.

---

### Timetable Management

Students can create and manage their personal class schedules.

A class can contain:

- Course name
- Course code
- Building
- Lecture hall
- Start time
- End time
- Class days
- Repeat schedule

Students can:

- Add classes
- Edit classes
- Delete classes
- View upcoming classes
- Select a campus building
- Navigate directly to a class

---

### "I'm Late" Mode

Raute includes an "I'm Late" experience for students who are running behind schedule.

The feature is designed to provide quick access to the student's upcoming class and immediately start navigation to the associated building.

---

### Campus Alerts

Raute is designed to support campus-wide notifications and announcements.

Potential alerts include:

- Building closures
- Maintenance
- Events
- Schedule changes
- Emergency announcements
- General campus notices

---

## Technology Stack

### Mobile Application

- React Native
- Expo
- Expo Router
- TypeScript
- NativeWind
- React Hook Form
- Zod

### Maps and Navigation

- Mapbox
- @rnmapbox/maps
- Mapbox Directions API
- Device location services

### Application Architecture

- React Context
- Custom React hooks
- Service-based architecture
- Component-driven UI
- Modular feature structure

### Development

- Git
- GitHub
- npm
- Xcode
- Android Studio

---

## Architecture

Raute follows a modular React Native architecture designed to keep application features separated and maintainable.

```text
Raute
│
├── app/
│   ├── (auth)/
│   ├── (drawer)/
│   │   └── (tabs)/
│   │       ├── home/
│   │       ├── map/
│   │       └── schedule/
│   │
│   └── map/
│
├── components/
│   ├── authentication/
│   ├── map/
│   ├── timetable/
│   ├── shared/
│   └── ui/
│
├── hooks/
│   ├── usePlaceSearch.ts
│   ├── useUserLocation.ts
│   └── useVoiceNavigation.ts
│
├── providers/
│   ├── reminders-provider.tsx
│   └── timetable-provider.tsx
│
├── services/
│   ├── navigation/
│   └── notification/
│
├── data/
│   ├── places.ts
│   ├── facilities.ts
│   └── navigation-steps.ts
│
├── constants/
│   └── mapbox.ts
│
└── types/
```

The architecture separates the application into:

```text
UI
 │
 ▼
Application Logic
 │
 ▼
Services
 │
 ▼
External APIs
```

This structure allows individual features to evolve independently while keeping the application maintainable.

---

## Navigation Flow

```text
Current Location
       │
       ▼
Search / Select Destination
       │
       ▼
View Location Details
       │
       ▼
Get Directions
       │
       ▼
Calculate Walking Route
       │
       ▼
Start Navigation
       │
       ├── Route Visualization
       ├── Step-by-Step Directions
       └── Voice Guidance
```

---

## Timetable Flow

```text
Add Class
   │
   ├── Course Information
   ├── Class Days
   ├── Start & End Time
   └── Campus Building
            │
            ▼
        Save Class
            │
            ▼
        My Schedule
            │
            ▼
        Select Class
            │
            ▼
     Navigate to Class
```

---

## Design Philosophy

Raute follows a minimal, modern, and mobile-first design approach.

The interface focuses on:

- Clear information hierarchy
- Simple navigation
- Consistent spacing
- Accessible interactions
- Context-aware interfaces
- Map-focused experiences
- Native mobile interaction patterns
- Minimal cognitive load

The objective is to make common campus tasks quick and intuitive rather than forcing users through complicated workflows.

---

## Application Structure

| Area       | Purpose                                     |
| ---------- | ------------------------------------------- |
| Home       | Campus overview and frequently used actions |
| Map        | Search, explore, and navigate campus        |
| Schedule   | Manage classes and timetable                |
| Navigation | Walking directions and route guidance       |
| Profile    | Account and user preferences                |
| Alerts     | Campus notifications                        |

---

## Getting Started

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Git
- Expo development environment
- Xcode for iOS development
- Android Studio for Android development

### Clone the Repository

```bash
git clone https://github.com/Albert735/raute.git

cd raute
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN=your_mapbox_public_token
```

Replace the value with your Mapbox public access token.

### Start the Development Server

```bash
npx expo start
```

For iOS:

```bash
npx expo run:ios
```

For Android:

```bash
npx expo run:android
```

Some native features require a development build rather than Expo Go.

---

## Environment Variables

| Variable                          | Description                |
| --------------------------------- | -------------------------- |
| `EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN` | Public Mapbox access token |

Do not commit private API keys, secrets, or production credentials to the repository.

---

## Project Status

Raute is currently under active development.

The initial implementation is focused on the University of Ghana campus and is being developed as a university campus navigation and student planning platform.

---

## Roadmap

### Navigation

- [x] Interactive campus map
- [x] Location search
- [x] Location categories
- [x] Building details
- [x] Walking route generation
- [x] Voice-guided navigation
- [x] Accessibility-aware routing
- [x] Indoor navigation

### Student Schedule

- [x] Add classes
- [x] Edit classes
- [x] Delete classes
- [x] Select class buildings
- [x] Navigate to classes
- [x] Persistent timetable storage
- [ ] Advanced reminders
- [ ] "I'm Late" mode

### Campus Platform

- [ ] Campus alerts
- [ ] Real-time campus updates
- [ ] University events
- [ ] Administrative location management
- [ ] Multi-campus support

---

## Contributing

Contributions, suggestions, and improvements are welcome.

To contribute:

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Commit your changes.

```bash
git commit -m "feat: add your feature"
```

5. Push the branch.

```bash
git push origin feature/your-feature
```

6. Open a pull request.

Please keep contributions focused and consistent with the existing architecture and coding conventions.

---

## Project Context

Raute is being developed as a university-focused campus navigation platform, with the initial target environment centered around the University of Ghana campus.

The project explores how mobile navigation, location services, and student scheduling can be combined to improve the everyday campus experience.

---

## License

This project is currently intended for educational and development purposes.

License information will be added as the project progresses.

---

## Author

**Albert Quaye**

Frontend Developer focused on React, React Native, Next.js, and user interface development.

---

<div align="center">

# Raute

**Find your place. Get there faster.**

</div>
