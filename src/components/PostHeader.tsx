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

//type---------------------------------------------
import { memo } from "react";
import type { Post } from "@models/PostTypes";

interface Props {
  item: Post;
  timeAgo?: string;
}
export const PostHeader = memo(({ item, timeAgo }: Props) => {
  return (
    <ContainerHeader>
      <LeftParts>
        <AvatarContainer>
          <BorderGradient width={47} height={47} stroke={6} />
          <TouchableWithoutFeedback>
            <AvatarImage
              source={{
                uri: item ? item.creatorPhoto || TEST_IMAGE : TEST_IMAGE
              }}
            />
          </TouchableWithoutFeedback>
        </AvatarContainer>

        <CreatorInfoContainer>
          <StyledText>{item.creatorName}</StyledText>
        </CreatorInfoContainer>
      </LeftParts>
      {timeAgo && (
        <View marginRight={5}>
          <Text style={{ alignSelf: "flex-end" }}> {timeAgo}</Text>
        </View>
      )}
    </ContainerHeader>
  );
});

export default PostHeader;
