import { categoryImages } from "@/data/category-images";

/**
 * Real photos of campus places, keyed by place id (data/places.ts).
 * `cover` is the image shown in lists and cards; `gallery` fills the photos
 * tab on the place page. Places without an entry fall back to the generic
 * image for their category.
 */
interface PlacePhotos {
  cover: number;
  gallery: number[];
}

const photos: Record<string, PlacePhotos> = {
  // Balme Library
  "4": {
    cover: require("@/assets/images/places/balme-front.jpg"),
    gallery: [
      require("@/assets/images/places/balme-front.jpg"),
      require("@/assets/images/places/balme-aerial.jpg"),
      require("@/assets/images/places/balme-tower.jpg"),
    ],
  },

  // ISSER Conference Hall
  "27": {
    cover: require("@/assets/images/places/isser-annex-front.jpg"),
    gallery: [
      require("@/assets/images/places/isser-annex-front.jpg"),
      require("@/assets/images/places/isser-annex-side.jpg"),
      require("@/assets/images/places/isser-hall.jpg"),
    ],
  },

  // Department of Computer Science
  "25": {
    cover: require("@/assets/images/places/cs-front.jpg"),
    gallery: [
      require("@/assets/images/places/cs-front.jpg"),
      require("@/assets/images/places/cs-entrance.jpg"),
      require("@/assets/images/places/cs-sign.jpg"),
    ],
  },
};

type PlaceLike = { id: string; category: string };

function fallback(place: PlaceLike) {
  return categoryImages[place.category] ?? categoryImages.library;
}

/** The photo to show for a place in lists and cards. */
export function getPlaceImage(place: PlaceLike) {
  return photos[place.id]?.cover ?? fallback(place);
}

/** Photos for a place's gallery (a single fallback image if it has none). */
export function getPlaceGallery(place: PlaceLike) {
  return photos[place.id]?.gallery ?? [fallback(place)];
}
