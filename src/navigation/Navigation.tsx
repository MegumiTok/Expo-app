import { useContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider } from "react-native-popup-menu";
import { store } from "@Redux/store";
import { Provider as ReduxProvider } from "react-redux";

import Routes from "./Routes";

// context--------------------------------
import { AuthProvider } from "./AuthProvider";

export const Navigation = () => {
  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <MenuProvider>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </MenuProvider>
      </SafeAreaProvider>
    </ReduxProvider>
  );
};

export default Navigation;
