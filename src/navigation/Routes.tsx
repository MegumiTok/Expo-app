import { useContext, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

//+firebase---------------------------------
import { auth } from "src/config/firebase";
import { onAuthStateChanged } from "firebase/auth";

//+type------------------------------
import type { FirebaseAuthTypes } from "@react-native-firebase/auth";
import type { AuthState } from "./AuthProvider";

//Context---------------------------
import { AuthContext } from "./AuthProvider";

//navigation------------------------
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "@navigation/AppNavigator";

export const Routes = () => {
  const { user, setUser } = useContext<AuthState>(AuthContext);
  const [initializing, setInitializing] = useState<boolean>(true);

  const arg = (user: FirebaseAuthTypes.User | null) => {
    if (user != null) {
      const uid = user.uid;
      console.log("User is signed in", uid);
    } else {
      console.log("User is signed out");
    }

    setUser(user);
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
      {user ? <AppNavigator /> : <AuthNavigator />}
    </SafeAreaProvider>
  );
};

export default Routes;
