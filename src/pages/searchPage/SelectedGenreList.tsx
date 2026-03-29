import ImageThumbnailGrid from "@components/ImageThumbnailGrid";

//redux==============================
import { useAppSelector } from "@Redux/hook";
import { selectPostsByGenre } from "@Redux/postsSlice";

export const SelectedGenreList = ({ route }) => {
  const { name } = route.params;
  const _genre = useAppSelector((state) => selectPostsByGenre(state, name));

  return <ImageThumbnailGrid data={_genre} resizeMode="contain" />;
};

export default SelectedGenreList;
