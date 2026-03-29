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

// フォントサイズ
export const FONT_SIZE_XS = 12;
export const FONT_SIZE_SM = 15;
export const FONT_SIZE_MD = 16;
export const FONT_SIZE_LG = 20;
export const FONT_SIZE_XL = 24;

// 共通レイアウト値
export const EVENT_CARD_HEIGHT = 140;
export const SEPARATOR_HEIGHT = 0.9;
export const INPUT_HEIGHT = 48;
export const BORDER_RADIUS_SM = 3;
export const BORDER_RADIUS_MD = 10;
export const BORDER_RADIUS_LG = 34;
export const ICON_SIZE_SM = 25;
export const ICON_SIZE_MD = 27;
export const ICON_SIZE_LG = 30;

// アニメーション
export const ICON_ANIMATION_DURATION = 200;
export const SKELETON_ANIMATION_SPEED = 800;

// テキスト表示制限
export const MAX_PREVIEW_LINES = 5;
export const CREATOR_NAME_LINES = 1;
export const CREATOR_COMMENT_LINES = 3;

// FlatList パフォーマンス設定
export const FEED_LIST_CONFIG = {
  initialNumToRender: 5,
  maxToRenderPerBatch: 5,
  updateCellsBatchingPeriod: 30,
  windowSize: 10
} as const;
