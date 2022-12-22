import { Text, View } from "native-base";
//npm i --save-dev @types/react-native-read-more-textをしたらエラー解決した

import ReadMore from "react-native-read-more-text";
//style--------------------------------------------
import basicStyles from "./styles/theme/basicStyleSheet";

export const ReadContinue = ({ comment }: { comment: string }) => {
  const _renderTruncatedFooter = (handlePress: any) => {
    return (
      <View mt="5" color="#76785F">
        <Text onPress={handlePress}>もっと読む</Text>
      </View>
    );
  };

  const _renderRevealedFooter = (handlePress: any) => {
    return (
      <View mt="5" color="#76785F">
        <Text onPress={handlePress}>たたむ</Text>
      </View>
    );
  };

  return (
    <>
      <ReadMore
        numberOfLines={5}
        renderTruncatedFooter={_renderTruncatedFooter}
        renderRevealedFooter={_renderRevealedFooter}
      >
        <Text style={basicStyles.basicText}>{comment}</Text>
      </ReadMore>
    </>
  );
};

export default ReadContinue;
