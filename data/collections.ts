import type { CategoryId } from "./categories";

export const COLLECTIONS: {
  id: string;
  title: string;
  categories: CategoryId[];
}[] = [
  { id: "study", title: "Study Spots", categories: ["library", "lab"] },
  { id: "food", title: "Grab a Bite", categories: ["cafeteria", "coffee"] },
  { id: "wellness", title: "Stay Well", categories: ["gym", "clinic"] },
  { id: "getaround", title: "Get Around", categories: ["shuttle"] },
];
