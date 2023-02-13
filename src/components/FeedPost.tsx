import { memo } from "react";
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

//function----------------
import { _takasaPost } from "@functions/_takasaPost";

export const FeedPost = memo(({ item }: { item: Post }) => {
  const _takasa = _takasaPost({
    imageH: item.imageH,
    imageW: item.imageW
  });
  return (
    <>
      <FeedPostHeader {...{ item }} />
      <Image
        style={{ width: SCREEN_WIDTH, height: _takasa }}
        source={{ uri: item.postedImage }}
        resizeMode="contain"
        alt="post"
      />
      {/* <FastImage
        style={{ width: SCREEN_WIDTH, height: _takasa }}
        // source={{ uri: item.postedImage }}
        source={{
          uri: item.postedImage,

          priority: FastImage.priority.normal
        }}
        resizeMode={FastImage.resizeMode.contain}
      /> */}
      <FeedPostFooter {...{ item }} />
    </>
  );
});

export default FeedPost;
