import { TouchableWithoutFeedback } from "react-native";
import { View, Text } from "native-base";
//const---------------------------------
import { TEST_IMAGE } from "../config/const";
//styles-----------------------------------------
import {
  ContainerHeader,
  LeftParts,
  AvatarContainer,
  AvatarImage,
  CreatorInfoContainer,
  StyledText
} from "@components/styles/pageStyle/FeedStyle";
import BorderGradient from "@components/styles/BorderGradient";
//comps--------------------------------------------
// import { PostGenre } from "@components/feed";

//type---------------------------------------------
import type { Post } from "@models/PostTypes";
import type { FC } from "react";

interface Props {
  item: Post;
  timeAgo?: string;
}
export const PostHeader: FC<Props> = ({ item, timeAgo }) => {
  // const { creatorUrl } = useContext(AuthContext);

  return (
    <ContainerHeader>
      <LeftParts>
        <AvatarContainer>
          <BorderGradient width={47} height={47} stroke={6} />
          <TouchableWithoutFeedback
          //   onPress={() =>
          //     navigation.navigate("CreatorTab", {
          //       screen: "Profile",
          //       params: { item: element },
          //     })
          //   }
          >
            <AvatarImage
              source={{
                uri: item ? item.creatorPhoto || TEST_IMAGE : TEST_IMAGE
              }}
            />
          </TouchableWithoutFeedback>
        </AvatarContainer>

        <CreatorInfoContainer>
          <StyledText>{item.creatorName}</StyledText>
          {/* <PostGenre genreId={item.genre} /> */}
        </CreatorInfoContainer>
      </LeftParts>
      {timeAgo && (
        <View marginRight={5}>
          <Text style={{ alignSelf: "flex-end" }}> {timeAgo}</Text>
        </View>
      )}
      {/* <Menu>
        <MenuTrigger>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={30}
            color="black"
          />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption
            onSelect={() => {
              // navigate("Update");
            }}
            text="編集"
          />
          <MenuOption onSelect={() => true}>
            <Text>削除</Text>
          </MenuOption>
          <MenuOption onSelect={() => true} text="共有" />
        </MenuOptions>
      </Menu> */}
    </ContainerHeader>
  );
};

export default PostHeader;
