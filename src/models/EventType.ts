export interface EventType {
  eventId: string;
  postedDate: string;
  title: string;
  // eventImage: string;
  eventURL: string; // eventURLはfirebaseから追加するようにする
  category: category;
}

export type category = "Pokémon" | "Hunter × Hunter" | "Attack on Titan";
