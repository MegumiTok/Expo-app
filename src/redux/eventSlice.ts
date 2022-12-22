import {
  PayloadAction,
  createSlice,
  createEntityAdapter
} from "@reduxjs/toolkit";

import { fetchEvents, deleteEvent, addEvent } from "./eventActions";

//type--------------------------
import type { Status } from "@models/StatusType";
import type { EventType } from "@models/EventType";
import type { RootState } from "./store";

interface StateType {
  allEvents: EventType[];
  status: Status;
  error: string | undefined;
}
// const eventAdapter = createEntityAdapter<EventType>({
//   sortComparer: (a, b) => b.postedDate.localeCompare(a.postedDate),
// });

const initialState: StateType = {
  allEvents: [],
  status: "idle",
  error: ""
} as StateType;

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //イベント情報を持ってくる========================================================
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allEvents = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //イベント情報を削除========================================================
      .addCase(deleteEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allEvents = state.allEvents.filter(
          (doc) => doc.eventId !== action.payload
        );
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //イベントを投稿========================================================
      .addCase(addEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allEvents.push(action.payload);
      });
  }
});

export const eventReducer = eventSlice.reducer;

export const selectAllEvents = (state: RootState) => state.events.allEvents;

export const selectEventByCategory = (state: RootState, category: any) =>
  selectAllEvents(state).filter((post) => post.category === category);
