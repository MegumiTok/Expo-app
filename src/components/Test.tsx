import { Center, Text } from "native-base";

export const Test = () => {
  return (
    <Center flex={1}>
      <Center
        bg="tomato"
        _text={{
          color: "white",
          fontWeight: "bold"
        }}
        height={200}
        width={{
          base: 200,
          lg: 250
        }}
      >
        <Text> Test</Text>
      </Center>
    </Center>
  );
};

export default Test;
