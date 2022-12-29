import styled from "styled-components/native";
//styles------------------------------------------------
import {
  SCREEN_WIDTH,
  SPACING,
  SPACING_BIG
} from "@components/styles/theme/layout";
import { Colors } from "@components/styles/theme/Colors";

export const HEADER_HEIGHT = 250;
const AVATAR_SIZE = SCREEN_WIDTH * 0.21;

export const HeaderWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  /* padding-top: ${SPACING_BIG}px; */
  /* padding-bottom: ${SPACING}px; */
  background-color: ${Colors.primary.general};
`;

export const ProfileImage = styled.Image`
  width: ${AVATAR_SIZE}px;
  height: ${AVATAR_SIZE}px;
  border-radius: ${AVATAR_SIZE}px;
  margin-top: ${SPACING};
  background-color: white;
`;
