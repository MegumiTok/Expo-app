import { createSlice } from "@reduxjs/toolkit";
import { GENRES } from "src/config/const";
const initialState = GENRES;

const genresSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {}
});

export const genreReducer = genresSlice.reducer;
