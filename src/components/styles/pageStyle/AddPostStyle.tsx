import styled from "styled-components/native";
import { Colors } from "../theme/Colors";
import { SPACING_BIG, SCREEN_WIDTH } from "../theme/layout";

export const _width = SCREEN_WIDTH - SPACING_BIG * 2;
export const StyledTextInput = styled.TextInput`
  width: 300px;
  height: 100px;
  background-color: white;
  padding: ${SPACING_BIG}px;
  border-color: ${Colors.bouder};
  border-width: 1px;
  border-radius: ${SPACING_BIG}px;
  /* font-size: 16em; */
  margin-top: ${SPACING_BIG}px;
`;

export const PhotoWrapper = styled.TouchableOpacity`
  /* width: ${SCREEN_WIDTH - SPACING_BIG * 2}px; */
  justify-content: center;
  align-items: center;
  border-radius: 1px;
  border-color: #ddd;
  margin-bottom: 10px;
  background-color: white;
`;

export const PostImage = styled.Image`
  width: ${_width}px;
  height: ${_width}px;
`;

export const CheckBoxWrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

// export const InputWrapper = styled.View`
//   border-width: 1px;
//   border-color: ${Colors.bouder};
//   margin-bottom: 30px;
// `;
