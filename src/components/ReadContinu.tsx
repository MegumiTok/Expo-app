import { Text } from "react-native";
//npm i --save-dev @types/react-native-read-more-textをしたらエラー解決した

import ReadMore from "react-native-read-more-text";
//style--------------------------------------------
import basicStyles from "./styles/theme/basicStyleSheet";

export const ReadContinu = ({ section }) => {
  const _renderTruncatedFooter = (handlePress: any) => {
    return (
      <Text style={{ color: "#76785F", marginTop: 5 }} onPress={handlePress}>
        もっと読む
      </Text>
    );
  };

  const _renderRevealedFooter = (handlePress: any) => {
    return (
      <Text style={{ color: "#76785F", marginTop: 5 }} onPress={handlePress}>
        たたむ
      </Text>
    );
  };

  return (
    <>
      <ReadMore
        numberOfLines={5}
        renderTruncatedFooter={_renderTruncatedFooter}
        renderRevealedFooter={_renderRevealedFooter}
      >
        <Text style={basicStyles.basicText}>{section.comment}</Text>
      </ReadMore>
    </>
  );
};

export default ReadContinu;
