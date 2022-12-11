import { createSlice, createDraftSafeSelector } from "@reduxjs/toolkit";

//type------------------------------------------------------------------
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Status } from "@models/StatusType";
import type { Creator } from "@models/AuthTypes";

interface AllCreatorProps {
  allCreators: Creator[];
  activeCreator: Creator | null;
  status: Status;
  error: string | undefined;
}
const initialState: AllCreatorProps = {
  allCreators: [],

  activeCreator: {
    creatorId: "", //変更不可（useIdで固定）
    creatorName: "", //変更不可
    creatorPhoto: "",
    // email: "",

    // posts: [],
    mainComment: ""
  },

  error: "",
  status: "idle"
};

export const creatorsSlice = createSlice({
  name: "creators",
  initialState,
  reducers: {}
});

export const creatorsReducer = creatorsSlice.reducer;
