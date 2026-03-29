import ImageThumbnailGrid from "@components/ImageThumbnailGrid";

//redux==============================
import { useAppSelector } from "@Redux/hook";
import { selectLikedPost } from "@Redux/postsSlice";

export const FavList = () => {
  const _favs = useAppSelector((state) => selectLikedPost(state));

  return <ImageThumbnailGrid data={_favs} />;
};

export default FavList;
