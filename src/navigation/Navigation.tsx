import { useContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider } from "react-native-popup-menu";
import { store } from "@Redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Routes from "./Routes";

// context--------------------------------
import { AuthProvider } from "./AuthProvider";

export const Navigation = () => {
  return (
    <ReduxProvider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <MenuProvider>
            <AuthProvider>
              <Routes />
            </AuthProvider>
          </MenuProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ReduxProvider>
  );
};

//Note that GestureHandlerRootView acts like a normal View. So if you want it to fill the screen, you will need to pass { flex: 1 } like you'll need to do with a normal View.
export default Navigation;
