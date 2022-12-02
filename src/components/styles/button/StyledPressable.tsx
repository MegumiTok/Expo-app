//styled-systemはややこしいので使うのをやめたが勉強のためCloseButtonで使ってます
import styled from "styled-components/native";
import type {
  BorderProps,
  BorderRadiusProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  SpaceProps
} from "styled-system";
import {
  border,
  borderRadius,
  color,
  compose,
  flexbox,
  layout,
  position,
  space
} from "styled-system";

export type StyledPressableProps = ColorProps &
  PositionProps &
  FlexboxProps &
  LayoutProps &
  SpaceProps &
  BorderProps &
  BorderRadiusProps;

const StyledPressable = styled.Pressable<StyledPressableProps>(
  compose(color, position, flexbox, layout, space, border, borderRadius)
);

export default StyledPressable;
