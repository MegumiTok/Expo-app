import { SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider } from "react-native-popup-menu";
import Test from "@components/Test";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";

export const Navigation = () => {
  return (
    <SafeAreaProvider>
      <MenuProvider>
        <AuthNavigator />
      </MenuProvider>
    </SafeAreaProvider>
  );
};

export default Navigation;
