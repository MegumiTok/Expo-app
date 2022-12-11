import { createSlice } from "@reduxjs/toolkit";
//+type---------------------------------
import type { Status } from "@models/StatusType";

interface EventType {
  eventId: string;
  postedDate: any;
  title: string;
  eventImage: string;
  pageLink: string;
  category: category;
}

type category = "1" | "2" | "3";

interface StateType {
  allEvents: EventType[];
  status: Status;
  error: string | undefined;
}

const initialState = {
  allEvents: [],
  status: "idle",
  error: ""
} as StateType;
const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {}
});

export const eventReducer = eventSlice.reducer;
