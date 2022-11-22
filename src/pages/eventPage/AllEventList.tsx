//イベント全体

import { View, Text } from "react-native";

//redux--------------------------------------------------
// import { useAppSelector, useAppDispatch } from "@modules/common/hook";
// import { fetchEvent } from "@modules/redux/eventActions";

export const AllEventList = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
      <Text>Event!!</Text>
    </View>
  );
};

export default AllEventList;
