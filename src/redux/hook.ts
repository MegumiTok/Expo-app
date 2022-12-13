//https://redux-toolkit.js.org/tutorials/typescript
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import type { Login, Register } from "@models/AuthTypes";
import { clearCurrentUser } from "./authSlice";

import {
  logout,
  sendPasswordReset,
  signInWithEmailPassword,
  // signInWithGoogle,
  signUpWithEmailPassword,
  fetchAuthUser
} from "./authActions";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Authentication======================
//hooksで管理すると便利なので作成
export const useAuthentication = () => {
  const dispatch = useAppDispatch();

  const loginWithEmailAndPassword = (data: Login) => {
    dispatch(signInWithEmailPassword(data));
  };
  // const loginWithGoogle = () => {
  //   dispatch(signInWithGoogle());
  // };
  const resetPassword = (email: string) => {
    dispatch(sendPasswordReset(email));
  };
  const registerWithEmailPassword = (data: Register) => {
    dispatch(signUpWithEmailPassword(data));
  };
  const logoutUser = () => {
    dispatch(logout());
    dispatch(clearCurrentUser());
  };

  return {
    loginWithEmailAndPassword,
    resetPassword,
    registerWithEmailPassword,
    logoutUser
    // loginWithGoogle,
  };
};
