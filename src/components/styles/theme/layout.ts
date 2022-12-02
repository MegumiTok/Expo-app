import { Dimensions } from "react-native";
export const { width, height } = Dimensions.get("window");

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
export const SIZE = 64;
export const ICON_SIZE = SIZE * 0.6;
export const SPACING = 5;
export const SPACING_BIG = 10;
export const SPACING_SQUARE = 4;
export const SPACING_SQUARE_SIZE = width / 2 - (SPACING + SPACING_SQUARE);

/*FeedPreviewで使用*/
export const PHOTO_HEIGHT = Math.round((width * 5) / 4);
