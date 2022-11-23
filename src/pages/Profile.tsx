import { GoBack } from "@components/styles/button";
import { View } from "native-base";
import { StyleSheet } from "react-native";

//const---------------------------------
import { TEST_IMAGE } from "@components/const";
//styles------------------------------------------------
import {
  HeaderWrapper,
  ProfileImage
} from "@components/styles/pageStyle/profileStyle";

// type-------------
import type { CreatorTabScreenProps } from "@models/NavTypes";

export const Profile = ({
  route,
  navigation
}: CreatorTabScreenProps<"Profile">) => {
  const { item } = route.params;
  return (
    <View flex={1}>
      <GoBack />
      <HeaderWrapper>
        <ProfileImage
          source={{
            uri: item.creatorPhoto ? item.creatorPhoto : TEST_IMAGE
          }}
        />
      </HeaderWrapper>
    </View>
  );
};
