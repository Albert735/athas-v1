/**
 * Calculates the distance in meters between two [lng, lat] points
 * using the Haversine formula — accurate enough for short campus distances.
 */
export function getDistanceMeters(
  a: [number, number],
  b: [number, number],
): number {
  const [lon1, lat1] = a;
  const [lon2, lat2] = b;

  const earthRadius = 6371000;

  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

  const deltaLatitude = toRadians(lat2 - lat1);
  const deltaLongitude = toRadians(lon2 - lon1);

  const value =
    Math.sin(deltaLatitude / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(deltaLongitude / 2) ** 2;

  return 2 * earthRadius * Math.asin(Math.sqrt(value));
}
