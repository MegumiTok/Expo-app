import {
  PayloadAction,
  createSlice,
  createEntityAdapter
} from "@reduxjs/toolkit";

import { fetchAllEvents, deleteEvent, addEvent } from "./eventActions";

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
    //イベントを投稿========================================================
    builder
      .addCase(addEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = "succeeded";
          state.allEvents.push(action.payload);
        }
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //イベント情報を持ってくる========================================================
      .addCase(fetchAllEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allEvents = action.payload;
      })
      .addCase(fetchAllEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    //イベント情報を削除========================================================
    // .addCase(deleteEvent.pending, (state) => {
    //   state.status = "loading";
    // })
    // .addCase(deleteEvent.fulfilled, (state, action) => {
    //   state.status = "succeeded";
    //   state.allEvents = state.allEvents.filter(
    //     (doc) => doc.eventId !== action.payload
    //   );
    // })
    // .addCase(deleteEvent.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.error = action.error.message;
    // });
  }
});

export const eventReducer = eventSlice.reducer;

export const selectAllEvents = (state: RootState) => state.events.allEvents;

export const selectEventByCategory = (state: RootState, category: string) =>
  selectAllEvents(state).filter((post) => post.category === category);
