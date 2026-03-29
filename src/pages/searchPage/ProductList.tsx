import ImageThumbnailGrid from "@components/ImageThumbnailGrid";

//redux==============================
import { useAppSelector } from "@Redux/hook";
import { selectProducts } from "@Redux/postsSlice";

export const ProductList = () => {
  const _products = useAppSelector((state) => selectProducts(state));

  return <ImageThumbnailGrid data={_products} />;
};

export default ProductList;
