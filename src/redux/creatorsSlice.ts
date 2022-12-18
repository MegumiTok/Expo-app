import { createSlice, createDraftSafeSelector } from "@reduxjs/toolkit";
import { fetchCreators, updateCreatorInfo } from "./creatorsActions";
//type------------------------------------------------------------------
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Status } from "@models/StatusType";
import type { Creator } from "@models/AuthTypes";
import type { RootState } from "./store";

interface AllCreatorProps {
  allCreators: Creator[];
  currentCreator: Creator | undefined;
  status: Status;
  error: string | undefined;
}
const initialState: AllCreatorProps = {
  allCreators: [],

  currentCreator: {
    creatorId: "", //変更不可（useIdで固定）
    creatorName: "", //変更不可
    creatorPhoto: "",
    // email: "",

    // posts: [],
    mainComment: "",
    updatedAt: ""
  },

  error: "",
  status: "idle"
};

export const creatorsSlice = createSlice({
  name: "creators",
  initialState,
  reducers: {
    setCreator(state, action: PayloadAction<string>) {
      state.currentCreator = state.allCreators.find(
        (user) => user.creatorId === action.payload
      ) as Creator;
    }
  },
  extraReducers: (builder) => {
    builder

      //Activeユーザー（クリエイターのみ）のプロフィール変更＝＝＝＝＝＝＝＝＝＝
      .addCase(updateCreatorInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCreatorInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentCreator = action.payload;
      })
      .addCase(updateCreatorInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //クリエイターのみのユーザー情報を持ってくる（ポストとは別！）＝＝＝＝＝＝＝＝
      .addCase(fetchCreators.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCreators.fulfilled,
        (state, action: PayloadAction<Creator[]>) => {
          state.status = "succeeded";
          state.allCreators = action.payload;
          // Add any fetched posts to the array
          // state.allCreators = state.allCreators.concat(action.payload);
        }
      )
      .addCase(fetchCreators.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // builder.addCase(fetchInboxUsers.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.inboxUsers = action.payload;
    // });
  }
});

export const creatorsReducer = creatorsSlice.reducer;
export const { setCreator } = creatorsSlice.actions;

export const creatorsSelector = (state: RootState) => state.creators;

export const selectAllCreators = createDraftSafeSelector(
  creatorsSelector,
  (creator) => creator.allCreators
);

export const selectSingleCreatorById = (state: RootState, userId: string) =>
  selectAllCreators(state).find((creator) => creator.creatorId === userId);
