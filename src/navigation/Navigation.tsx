import { SafeAreaProvider } from "react-native-safe-area-context";

import Test from "src/templates/Test";
import AppNavigator from "./AppNavigator";

export const Navigation = () => {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default Navigation;
