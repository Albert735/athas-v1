import { getDistanceMeters } from "@/utils/geo";

/**
 * Developer tool: pretends the student is walking along a route, so
 * navigation, voice and the arrival screen can be tested without leaving
 * the desk. Positions are published here and picked up by useLiveLocation.
 */

export interface SimulatedLocation {
  coords: [number, number]; // [longitude, latitude]
  accuracy: number;
  heading: number;
}

type Listener = () => void;

const TICK_MS = 500;
const WALKING_SPEED_MPS = 1.4;

let current: SimulatedLocation | null = null;
let timer: ReturnType<typeof setInterval> | null = null;
const listeners = new Set<Listener>();

function publish(next: SimulatedLocation | null) {
  current = next;
  listeners.forEach((listener) => listener());
}

export function subscribeSimulatedLocation(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSimulatedLocation() {
  return current;
}

function bearing(a: [number, number], b: [number, number]) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLon = toRad(b[0] - a[0]);
  const y = Math.sin(dLon) * Math.cos(toRad(b[1]));
  const x =
    Math.cos(toRad(a[1])) * Math.sin(toRad(b[1])) -
    Math.sin(toRad(a[1])) * Math.cos(toRad(b[1])) * Math.cos(dLon);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

/** Walks along `line` from its start to its end at `speedMultiplier` × walking pace. */
export function startSimulatedWalk(
  line: [number, number][],
  speedMultiplier = 1,
  onFinish?: () => void,
) {
  stopSimulatedWalk();

  if (line.length < 2) return;

  let segment = 0;
  let from = line[0];
  publish({ coords: from, accuracy: 5, heading: bearing(line[0], line[1]) });

  timer = setInterval(() => {
    let remaining = WALKING_SPEED_MPS * speedMultiplier * (TICK_MS / 1000);

    while (remaining > 0 && segment < line.length - 1) {
      const to = line[segment + 1];
      const gap = getDistanceMeters(from, to);

      if (gap <= remaining) {
        remaining -= gap;
        from = to;
        segment += 1;
      } else {
        const t = remaining / gap;
        from = [from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t];
        remaining = 0;
      }
    }

    const ahead = line[Math.min(segment + 1, line.length - 1)];

    publish({
      coords: from,
      accuracy: 5,
      heading: bearing(from, ahead),
    });

    if (segment >= line.length - 1) {
      stopSimulatedWalk(true);
      onFinish?.();
    }
  }, TICK_MS);
}

/** Stops the walk. By default the fake position is cleared; `keep` leaves it in place. */
export function stopSimulatedWalk(keep = false) {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  if (!keep) publish(null);
}
