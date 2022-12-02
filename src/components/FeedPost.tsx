import { Image } from "native-base";
// styleーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
import { SCREEN_WIDTH, PHOTO_HEIGHT } from "@components/styles/theme/layout";
// import { FeedPostHeader, FeedPostFooter } from "@components/templates";
import FeedPostHeader from "./FeedPostHeader";
import FeedPostFooter from "./FeedPostFooter";
//type--------------------------------------------
import type { Post } from "@models/PostTypes";
// interface Props {
//   element: any;
// }
export const FeedPost = ({ item }: { item: Post }) => {
  const calculatedMaxH = Math.round((SCREEN_WIDTH * item.imageH) / item.imageW); //実際ポストされるのサイズに計算

  const _takasa: number =
    calculatedMaxH < PHOTO_HEIGHT ? calculatedMaxH : PHOTO_HEIGHT;

  return (
    <>
      <FeedPostHeader {...{ item }} />
      <Image
        style={{ width: SCREEN_WIDTH, height: _takasa }}
        source={{ uri: item.postedImage }}
        resizeMode="contain"
        alt="post"
      />
      <FeedPostFooter {...{ item }} />
    </>
  );
};

export default FeedPost;
