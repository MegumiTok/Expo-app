import { memo } from "react";
import { Text, View } from "native-base";

import ReadMore from "react-native-read-more-text";
//style--------------------------------------------
import basicStyles from "./styles/theme/basicStyleSheet";
import { MAX_PREVIEW_LINES } from "./styles/theme/layout";

const ReadMoreFooter = ({
  handlePress,
  label
}: {
  handlePress: () => void;
  label: string;
}) => (
  <View mt="5" color="#76785F">
    <Text onPress={handlePress}>{label}</Text>
  </View>
);

export const ReadContinue = memo(({ comment }: { comment: string }) => {
  return (
    <ReadMore
      numberOfLines={MAX_PREVIEW_LINES}
      renderTruncatedFooter={(handlePress: any) => (
        <ReadMoreFooter handlePress={handlePress} label="もっと読む" />
      )}
      renderRevealedFooter={(handlePress: any) => (
        <ReadMoreFooter handlePress={handlePress} label="たたむ" />
      )}
    >
      <Text style={basicStyles.basicText}>{comment}</Text>
    </ReadMore>
  );
});

export default ReadContinue;
