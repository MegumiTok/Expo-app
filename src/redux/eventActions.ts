import { db, allEventsColRef } from "src/config/firebase";
import {
  query,
  getDocs,
  where,
  deleteDoc,
  doc,
  setDoc
} from "firebase/firestore";
import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import type { EventType } from "@models/EventType";
import { All_EVENTS } from "src/config/const";

/**
 * function
 */

// const getEventByCategory = async (eventId: string) => {
//   const q = query(allEventsColRef, where("eventId", "==", eventId));
//   const eventDocs = await getDocs(q);
//   const isEmpty = eventDocs.empty;

//   if (isEmpty) return null;

//   const currentDoc = eventDocs.docs[0];
//   const eventData = {
//     ...currentDoc.data()
//     // eventId: currentDoc.id,
//   } as EventType;

//   return eventData;
// };

const getAllEvents = async () => {
  const querySnapshot = await getDocs(allEventsColRef);
  const docs = querySnapshot.docs;
  const events = [] as EventType[];

  for (let i = 0; i < docs.length; i++) {
    const eventData = docs[i].data() as EventType;

    events.push({
      ...eventData
    });
  }

  return events.sort(
    (a, b) =>
      new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
  );
};

// createAsyncThunk================================
/**
 * 投稿をする
 */
export const addEvent = createAsyncThunk(
  "event/addEvent",
  async (EventInfo: EventType) => {
    const randomId = nanoid();
    // const { EventInfo } = initialPost;
    try {
      // const eventRef = doc(allEventsColRef);
      const eventRef = doc(db, All_EVENTS, randomId);

      const event: EventType = {
        ...EventInfo,
        postedDate: new Date().toISOString(),
        eventId: randomId
      };
      await setDoc(eventRef, event);
      return event;
    } catch (error: unknown) {
      console.log("addNewEventで例外処理発生", error);
    }
  }
);

/**
 * すべてのEventをとってくる
 */
export const fetchAllEvents = createAsyncThunk(
  "event/fetchAllEvents",
  async (_, thunkAPI) => {
    try {
      const events = await getAllEvents();
      return events;
    } catch (e) {
      console.log("fetchAllEvents失敗:", e);
      return thunkAPI.rejectWithValue({ error: "fetchAllEvents失敗" });
    }
  }
);

// export const deleteEvent = createAsyncThunk(
//   "event/deleteEvent",
//   async (id, thunkAPI) => {
//     const q = query(allEventCollectionRef, where("eventId", "==", id));
//     const querySnapshot = await getDocs(q);
//     const firestoreData = [] as EventType[];
//     querySnapshot.forEach((doc) => {
//       const eventInfo = doc.data();

//       firestoreData.push({
//         eventId: eventInfo.eventId,
//         strangeInfo: eventInfo.strangeInfo,
//       });
//     });
//     const eventRef = doc(db, All_EVENTS, firestoreData[0].eventId);
//     await deleteDoc(eventRef);
//   }
// );

/**
 * Eventを削除する
 */
export const deleteEvent = createAsyncThunk(
  "event/deleteEvent",
  async (eventId: string, thunkAPI) => {
    try {
      await deleteDoc(doc(db, All_EVENTS, eventId));
      return eventId;
    } catch (error: any) {
      console.error(error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
