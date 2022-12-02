import { useEffect } from "react";
import { View, ActivityIndicator, Text } from "react-native";

//redux--------------------------------------------------
// import { useAppSelector, useAppDispatch } from "@modules/common/hook";
// import { fetchEvent } from "@modules/redux/eventActions";

export const EventList1 = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
      <Text>Event1</Text>
    </View>
  );
};

export default EventList1;
