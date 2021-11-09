import { useState, useEffect, useCallback } from "react";
import { Box, Flex, Spinner, SimpleGrid, Text } from "@chakra-ui/react";

import { api } from "../services/api";
import { useQuery } from "react-query";
import { Product } from "../components/product";
import { Search } from "../components/search";

export default function Home() {
  const [value, setValue] = useState("");

  const { isFetching, data, isLoading } = useQuery(
    "products",
    async () => {
      const response = await api.get("");
      return response.data;
    },
    {
      staleTime: 1000 * 5,
      // refetchInterval: 1000 * 5, # Time to refetch data
    }
  );

  const getProductsData = useCallback(
    () => data?.products?.map((product) => product.name) ?? [],
    [data?.products]
  );

  const getSuggestionsData = () =>
    data?.suggestions?.map((suggestion) => suggestion.term) ?? [];

  const options = getSuggestionsData();
  const [products, setProducts] = useState<string[]>(getProductsData());

  useEffect(() => setProducts(getProductsData()), [data, getProductsData]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setProducts(
      getProductsData().filter((product) =>
        product.toLowerCase().includes(value.toLowerCase())
      ) ?? []
    );
  };

  return (
    <Box maxW={1280} mx="auto" px="6">
      <Search
        handleSearch={handleSearch}
        options={options}
        value={value}
        setValue={setValue}
      />
      <Flex align="center" mb="2">
        <Text
          fontSize="24"
          color="gray.100"
          fontWeight="bold"
          align="center"
          display="flex"
        >
          Products
        </Text>
        {isFetching && <Spinner color="pink.500" size="md" ml="2" />}
      </Flex>

      <Flex w="100%" justify="center" align="center">
        {isLoading ? (
          <Spinner color="pink.500" size="lg" />
        ) : (
          <SimpleGrid flex="1" gap="4" minChildWidth="300px" align="flex-start">
            {products.map((product) => (
              <Product key={`product-${product}`} name={product} />
            ))}
          </SimpleGrid>
        )}
      </Flex>
    </Box>
  );
}
