import { SafeAreaProvider } from "react-native-safe-area-context";

import { Text, View } from "native-base";
import Test from "src/templates/Test";

export const Navigation = () => {
  return (
    <SafeAreaProvider>
      <Test />
    </SafeAreaProvider>
  );
};

export default Navigation;
