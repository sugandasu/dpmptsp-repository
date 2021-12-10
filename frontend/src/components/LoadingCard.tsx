import { Flex, Spinner } from "@chakra-ui/react";

export const LoadingCard: React.FC<{}> = () => {
  return (
    <Flex width="100%" justify="center" align="center">
      <Spinner
        thickness="4px"
        speed="0.8s"
        emptyColor="gray.200"
        color="blue.500"
        size="lg"
      />
    </Flex>
  );
};
