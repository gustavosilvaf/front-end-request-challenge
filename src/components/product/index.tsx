import { Box, Text } from "@chakra-ui/react";

export const Product = ({ name }: { name: String }) => {
  return (
    <Box bg="pink.500" p="4" borderRadius="4px" color="gray.50" data-cy="product">
      <Text>{name}</Text>
    </Box>
  );
};
