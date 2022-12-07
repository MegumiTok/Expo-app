import { GoBack } from "@components/styles/button";
import { View, Text } from "native-base";
// import { StatusBar } from "expo-status-bar";
import { StatusBar } from "react-native";

//const---------------------------------
import { TEST_IMAGE, STATUS_BAR_HEIGHT } from "src/config/const";
//styles------------------------------------------------
import {
  HeaderWrapper,
  ProfileImage
} from "@components/styles/pageStyle/profileStyle";

//data-----------------
import { posts } from "@assets/data/posts";
//hooks--------------
import { useComponentHeight } from "@hooks/useComponentHeight";
//comps---------------
import ProfileTabView from "@components/ProfileTabView";
import BtnForCreatorsList from "@components/BtnForCreatorsList";
// type-------------
import type { CreatorTabScreenProps } from "@models/NavTypes";

export const Profile = ({
  route,
  navigation
}: CreatorTabScreenProps<"Profile">) => {
  const { item } = route.params;
  const [topHeight, onLayout] = useComponentHeight(); //💚 headerのサイズ取得

  // console.log(STATUS_BAR_HEIGHT);
  return (
    <View flex={1} paddingTop={STATUS_BAR_HEIGHT}>
      <StatusBar animated={true} hidden={false} />
      <GoBack />
      <BtnForCreatorsList />
      <HeaderWrapper onLayout={onLayout}>
        <View
          style={{
            alignItems: "center" //これでimageとtextを縦並び
          }}
        >
          <ProfileImage
            source={{
              uri: item.creatorPhoto ? item.creatorPhoto : TEST_IMAGE
            }}
          />
          <View //🟢Want to know the size of this component
            style={{
              alignItems: "center" //これでimageとtextを縦並び
            }}
          >
            <Text>{item.creatorName}</Text>
          </View>
        </View>
      </HeaderWrapper>
      <ProfileTabView topHeight={topHeight} posts={posts} />
    </View>
  );
};
