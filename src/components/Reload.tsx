import { useEffect } from "react";
//redux----------------------------------------------------------------
// import { selectAllPosts } from "@Redux/postsSlice";
import { useAppDispatch, useAppSelector } from "@Redux/hook";
import { fetchAllPosts } from "@Redux/postActions";

// components================
import { LoadingView } from "@components/styles/LoadingView";

export const Reload = () => {
  const dispatch = useAppDispatch();
  // const posts = useAppSelector(selectAllPosts);
  const postStatus = useAppSelector((state) => state.posts.status);
  // const error = useAppSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchAllPosts());
    }
  }, [postStatus, dispatch]);

  let content;
  if (postStatus === "loading") {
    content = <LoadingView />;
  } else if (postStatus === "succeeded") {
    content = null;
  }
  //   else if (postStatus === "failed") {
  //     content = <ErrorPage error={error} />;
  //   }
  return <>{content}</>;
};
