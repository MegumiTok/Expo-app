import { Center } from "native-base";

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
        Test
      </Center>
    </Center>
  );
};

export default Test;
