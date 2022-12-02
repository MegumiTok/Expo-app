import { SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider } from "react-native-popup-menu";
import Test from "@components/Test";
import AppNavigator from "./AppNavigator";

export const Navigation = () => {
  return (
    <SafeAreaProvider>
      <MenuProvider>
        <AppNavigator />
      </MenuProvider>
    </SafeAreaProvider>
  );
};

export default Navigation;
