import { createSlice } from "@reduxjs/toolkit";

//type--------------------------
import type { User } from "firebase/auth";
import type { PayloadAction, SerializedError } from "@reduxjs/toolkit";
import type { Auth } from "@models/AuthTypes";
import type { Status } from "@models/StatusType";
// import { flg } from "@models/AuthTypes";

export interface AuthProps {
  currentUser: Auth;
  error?: SerializedError | string;
  status: Status;
}
const initialState: AuthProps = {
  currentUser: {
    userId: "",
    userName: "",
    email: "",
    userPhoto: "",
    userFlg: "creator" || "general" || "stuff",
    createdAt: "",
    updatedAt: "",
    mainComment: ""
  },
  error: "",
  status: "idle"
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {}
});

const { reducer } = authSlice;
export const authReducer = reducer;
