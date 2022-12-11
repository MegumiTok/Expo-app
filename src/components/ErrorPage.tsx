import { Text, Center } from "native-base";
export const ErrorPage = ({ error }: { error: string | undefined }) => {
  return (
    <Center flex={1}>
      <Text>{error}</Text>
    </Center>
  );
};

export default ErrorPage;
