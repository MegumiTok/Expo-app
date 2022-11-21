export const posts = [
  {
    postId: "a1",
    creatorId: "b2", //selectPostsByUserで使用中
    creatorName: "akiko",
    creatorPhoto:
      "https://images.pexels.com/photos/3866555/pexels-photo-3866555.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", //null必要（type Creator参照）
    date: "",
    genre: "neko",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, officiis at. Fugit, mollitia, sunt explicabo veritatis ",
    // postedImage: string | [],
    postedImage:
      "https://images.freeimages.com/images/large-previews/df6/free-image-for-your-seo-blog-or-web-marketing-website-1636060.jpg", //一枚投稿のみ
    reactions: {
      thumbsUp: "",
      hooray: "",
      heart: "",
      clap: "",
      surprise: ""
    },
    // isLiked: boolean,
    // carrousel: boolean,
    imageW: "400",
    imageH: "500",
    // documentID?: string,
    product: true //追加
  },
  {
    postId: "a2",
    creatorId: "b3", //selectPostsByUserで使用中
    creatorName: "naoko",
    creatorPhoto:
      "https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", //null必要（type Creator参照）
    date: "",
    genre: "neko",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, officiis at. Fugit, mollitia, sunt explicabo veritatis ",
    // postedImage: string | [],
    postedImage:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", //一枚投稿のみ
    reactions: {
      thumbsUp: "",
      hooray: "",
      heart: "",
      clap: "",
      surprise: ""
    },
    // isLiked: boolean,
    // carrousel: boolean,
    imageW: "400",
    imageH: "800",
    // documentID?: string,
    product: true //追加
  }
];
