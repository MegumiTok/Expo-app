import { useContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider } from "react-native-popup-menu";

import Routes from "./Routes";

// context--------------------------------
import { AuthProvider } from "./AuthProvider";

export const Navigation = () => {
  return (
    <SafeAreaProvider>
      <MenuProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </MenuProvider>
    </SafeAreaProvider>
  );
};

export default Navigation;
