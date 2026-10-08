type Position = [number, number]; // [longitude, latitude]

export interface RouteSnap {
  /** Closest point on the route to the user. */
  point: Position;
  /** Index of the route segment that point lies on (segment i = coords[i] → coords[i + 1]). */
  segmentIndex: number;
  /** How far the user is from the route line, in metres. */
  distanceFromRoute: number;
}

const METERS_PER_DEGREE_LAT = 111_320;

/**
 * Finds the closest point on a route line to the user's position.
 * Works in a flat local metre grid, which is accurate over campus distances.
 */
export function snapToRoute(
  coordinates: Position[],
  position: Position,
): RouteSnap | null {
  if (coordinates.length < 2) return null;

  const [lng, lat] = position;
  const metersPerDegreeLng = METERS_PER_DEGREE_LAT * Math.cos((lat * Math.PI) / 180);

  const toXY = ([x, y]: Position): [number, number] => [
    (x - lng) * metersPerDegreeLng,
    (y - lat) * METERS_PER_DEGREE_LAT,
  ];

  let best: RouteSnap | null = null;

  for (let i = 0; i < coordinates.length - 1; i++) {
    const [ax, ay] = toXY(coordinates[i]);
    const [bx, by] = toXY(coordinates[i + 1]);

    const dx = bx - ax;
    const dy = by - ay;
    const lengthSquared = dx * dx + dy * dy;

    // The user sits at (0, 0) in this grid.
    const t =
      lengthSquared === 0
        ? 0
        : Math.max(0, Math.min(1, -(ax * dx + ay * dy) / lengthSquared));

    const px = ax + t * dx;
    const py = ay + t * dy;
    const distance = Math.hypot(px, py);

    if (!best || distance < best.distanceFromRoute) {
      best = {
        point: [
          coordinates[i][0] + t * (coordinates[i + 1][0] - coordinates[i][0]),
          coordinates[i][1] + t * (coordinates[i + 1][1] - coordinates[i][1]),
        ],
        segmentIndex: i,
        distanceFromRoute: distance,
      };
    }
  }

  return best;
}

/** The part of the route still ahead of the user, starting at their snapped position. */
export function getRemainingRoute(
  coordinates: Position[],
  snap: RouteSnap,
): Position[] {
  return [snap.point, ...coordinates.slice(snap.segmentIndex + 1)];
}
