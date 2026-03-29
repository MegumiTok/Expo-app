import { Easing, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { ICON_ANIMATION_DURATION } from "@components/styles/theme/layout";

const ICON_EASING = Easing.bezier(0.68, -0.6, 0.32, 1.6);

const iconTimingConfig = {
  duration: ICON_ANIMATION_DURATION,
  easing: ICON_EASING
};

export const IconAnimation = (trigger) => {
  const IconFilled = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withTiming(trigger ? 1 : 0, iconTimingConfig) }
      ],
      opacity: withTiming(trigger ? 1 : 0, iconTimingConfig)
    };
  });

  const IconRegular = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withTiming(trigger ? 0 : 1, iconTimingConfig) }
      ],
      opacity: withTiming(trigger ? 0 : 1, iconTimingConfig)
    };
  });
  return { IconFilled, IconRegular };
};

export default IconAnimation;
