export interface EventType {
  eventId: string;
  postedDate: string;
  title: string;
  eventImage: string;
  eventURL: string;
  category: category;
}

export type category = "1" | "2" | "3";
