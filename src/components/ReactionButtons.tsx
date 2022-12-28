// import { View, Text, TouchableOpacity } from "react-native";

// //redyx------------------------------------------
// import { useAppDispatch } from "@Redux/hook";

// import { reactionAdded } from "@modules/redux/postsSlice";

// //type------------------------------------------------

// import type { Post, ReactionType } from "@models/PostTypes";
// import type { FC } from "react";
// //style---------------------------------------------
// import basicStyles from "./styles/theme/basicStyleSheet";

// const reactions = {
//   thumbsUp: "👍",
//   hooray: "🎉",
//   heart: "❤️",

//   clap: "👏",
//   surprise: "😲",
// };

// interface Props {
//   item: Post;
// }
// export const ReactionButtons: FC<Props> = ({ item }) => {
//   const dispatch = useAppDispatch();
//   const reactionButtons = Object.entries(reactions).map(([name, mark]) => {
//     return (
//       <TouchableOpacity
//         style={basicStyles.button}
//         key={name}
//         onPress={() =>
//           dispatch(
//             reactionAdded({
//               postId: item.postId,
//               reaction: name as ReactionType,
//             })
//           )
//         }
//       >
//         <Text style={{ color: "white" }}>
//           {mark} {item.reactions[name]}
//           {/* {mark} */}
//         </Text>
//       </TouchableOpacity>
//     );
//   });
//   return (
//     <View
//       style={{
//         paddingVertical: 20,
//         flexDirection: "row",
//         justifyContent: "space-evenly",
//       }}
//     >
//       {reactionButtons}
//     </View>
//   );
// };
