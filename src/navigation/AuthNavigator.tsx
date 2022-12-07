import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
//typesー－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
import { AuthRoutes } from "@models/NavTypes";
import type { AuthStackParamList } from "@models/NavTypes";

//page--------------------------------------------------------------
import LoginPage from "@pages/authPage/LoginPage";
import SignupPage from "@pages/authPage/SignupPage";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator initialRouteName={AuthRoutes.Signup}>
        <AuthStack.Screen
          name={AuthRoutes.Login}
          component={LoginPage}
          options={{ header: () => null }}
        />
        <AuthStack.Screen
          name={AuthRoutes.Signup}
          component={SignupPage}
          options={({ navigation }) => ({
            title: "アカウントを作る",
            headerStyle: {
              backgroundColor: "#f9fafd",
              shadowColor: "#f9fafd",
              elevation: 0 //for android
            },
            headerLeft: () => (
              <View style={{ marginLeft: 10 }}>
                <FontAwesome.Button
                  name="long-arrow-left"
                  size={25}
                  backgroundColor="#f9fafd"
                  color="#333"
                  onPress={() => navigation.navigate(AuthRoutes.Login)}
                />
              </View>
            )
          })}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
