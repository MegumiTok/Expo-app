import { SCREEN_WIDTH, PHOTO_HEIGHT } from "@components/styles/theme/layout";

export const _takasaPost = ({
  imageH,
  imageW
}: {
  imageH: number;
  imageW: number;
}) => {
  const calculatedMaxH = Math.round((SCREEN_WIDTH * imageH) / imageW); //実際ポストされるのサイズに計算
  const TAKASA = calculatedMaxH < PHOTO_HEIGHT ? calculatedMaxH : PHOTO_HEIGHT;
  return TAKASA;
};
