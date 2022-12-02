import Svg, { LinearGradient, Stop, Circle, Defs } from "react-native-svg";

interface Props {
  width: number;
  height: number;
  stroke: number;
}

export const BorderGradient = ({ width, height, stroke }: Props) => {
  return (
    //https://github.com/react-native-svg/react-native-svg#defs
    //LinearGradient must be nested within a <Defs> tag
    //The id prop of the tag defines a unique name for the gradient
    //The x1, x2, y1,y2 props of the tag define the start and end position of the gradient
    <Svg
      width={width}
      height={height}
      strokeWidth={stroke}
      stroke="white"
      viewBox="0 0 200 200"
    >
      <Defs>
        <LinearGradient id="grad" x1="0" y1="1" x2="1" y2="0">
          <Stop offset="0" stopColor="#feda75" stopOpacity="1" />
          <Stop offset="0.4" stopColor="#D93C96" stopOpacity="1" />
          <Stop offset="1" stopColor="#FFDEF6" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Circle stroke="url(#grad)" cx="100" cy="100" r="90" />
    </Svg>
  );
};

export default BorderGradient;
