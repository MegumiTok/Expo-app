import { Easing, useAnimatedStyle, withTiming } from "react-native-reanimated";

export const iconAnimation = (trigger) => {
  const IconFilled = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(trigger ? 1 : 0, {
            duration: 200,
            easing: Easing.bezier(0.68, -0.6, 0.32, 1.6)
          })
        }
      ],
      opacity: withTiming(trigger ? 1 : 0, {
        duration: 200,
        easing: Easing.bezier(0.68, -0.6, 0.32, 1.6)
      })
    };
  });

  const IconRegular = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(trigger ? 0 : 1, {
            duration: 200,
            easing: Easing.bezier(0.68, -0.6, 0.32, 1.6)
          })
        }
      ],
      opacity: withTiming(trigger ? 0 : 1, {
        duration: 200,
        easing: Easing.bezier(0.68, -0.6, 0.32, 1.6)
      })
    };
  });
  return { IconFilled, IconRegular };
};

export default iconAnimation;
