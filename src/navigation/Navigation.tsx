import { useEffect, useState, useContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider } from "react-native-popup-menu";
import Test from "@components/Test";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";

//+firebase---------------------------------
import { auth } from "src/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import type { FirebaseAuthTypes } from "@react-native-firebase/auth";

//Context---------------------------
import { AuthContext } from "./AuthProvider";
import type { AuthState } from "./AuthProvider";

export const Navigation = () => {
  const { activeUser, setActiveUser } = useContext<AuthState>(AuthContext);
  // const [activeUser, setActiveUser] = useState<User | null>();
  const [initializing, setInitializing] = useState<boolean>(true);

  const arg = (user) => {
    if (user != null) {
      const uid = user.uid;
      console.log("User is signed in", uid);
    } else {
      console.log("User is signed out");
    }
    setActiveUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, arg);
    return subscriber;
  }, []);

  if (initializing) return null;

  // console.log(initializing);
  return (
    <SafeAreaProvider>
      <MenuProvider>
        {activeUser ? <AppNavigator /> : <AuthNavigator />}
      </MenuProvider>
    </SafeAreaProvider>
  );
};

export default Navigation;
