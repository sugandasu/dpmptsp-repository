import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import React from "react";

type CardProps = {
  title: string;
  aksi?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ children, title, aksi }) => {
  return (
    <Box my={5} p={5} shadow="md">
      {aksi ? (
        <Flex mb={5} align="center">
          <Heading fontSize="xl">{title}</Heading>
          <Spacer></Spacer>
          <Button>Menu</Button>
        </Flex>
      ) : (
        <Heading fontSize="xl">{title}</Heading>
      )}
      {children}
    </Box>
  );
};

export default Card;
