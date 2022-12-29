import styled from "styled-components/native";
import { Colors } from "../theme/Colors";
import { SPACING, SPACING_BIG } from "../theme/layout";

//Main Feed===================================
export const FeedHeader = styled.View`
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  background-color: ${Colors.primary.dark};
  padding: ${SPACING_BIG}px;
`;

export const Icons = styled.View`
  //Iconが複数になる可能性があるのでこの命名
  flex-direction: row;
  align-self: flex-end;
  position: absolute;
  bottom: ${SPACING_BIG}px;
  right: ${SPACING_BIG}px;
  justify-content: space-evenly;
  /* align-items: flex-end; */
`;

export const HeaderSpace = styled.View`
  //💚ヘッダー分だけ下げる
  margin-top: 130px;
  padding-left: 10px;
`;

//FeedPostHeader============================================

export const ContainerHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${SPACING_BIG}px;
  margin-bottom: ${SPACING}px;
  padding-right: ${SPACING}px;
`;

export const LeftParts = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AvatarContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-left: ${SPACING}px;
  margin-right: ${SPACING}px;
`;

export const AvatarImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  position: absolute;
`;

export const CreatorInfoContainer = styled.View`
  justify-content: center;
`;

export const StyledText = styled.Text`
  color: ${Colors.text};
  /* font-weight: bold; */
  font-weight: 600;
  margin-left: ${SPACING}px;
  margin-right: ${SPACING}px;
`;
