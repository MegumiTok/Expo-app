import { createContext, useState } from "react";

//type----------------------------------------------
import type { ReactNode, FC, Dispatch, SetStateAction } from "react";
import type { flg } from "@models/AuthTypes";
import type { FirebaseAuthTypes } from "@react-native-firebase/auth";

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthState {
  // user: FirebaseAuthTypes.User | null;
  // setUser: (user: FirebaseAuthTypes.User | null) => void;
  activeUser: FirebaseAuthTypes.User | null | null;
  setActiveUser: Dispatch<SetStateAction<FirebaseAuthTypes.User | null>>;
  // userPhoto: FirebaseAuthTypes.User | null;
  // setUserPhoto: (userPhoto: FirebaseAuthTypes.User | null) => void;
  userFlg: flg;
  setUserFlg: (userFlg: flg) => void;
}

export const AuthContext = createContext({} as AuthState);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [activeUser, setActiveUser] = useState<FirebaseAuthTypes.User | null>(
    null
  );

  const [userFlg, setUserFlg] = useState<flg>("creator");
  return (
    <AuthContext.Provider
      value={{
        activeUser,
        setActiveUser,
        userFlg,
        setUserFlg
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
