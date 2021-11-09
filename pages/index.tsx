import { useState } from "react";
import {
  Box,
  Flex,
  Button,
  Spinner,
  SimpleGrid,
  FormControl,
} from "@chakra-ui/react";

import { BsSearch } from "react-icons/bs";
import { api } from "../services/api";
import { useQuery } from "react-query";
import { Hint } from "react-autocomplete-hint";
import { Product } from "../components/product";
import { FormEventHandler } from "toasted-notes/node_modules/@types/react";

export default function Home() {
  const [value, setValue] = useState("");

  const { isFetching, data } = useQuery("products", async () => {
    const response = await api.get("");
    return response.data;
  });

  const getProductsData = () =>
    data?.products?.map((product) => product.name) ?? [];

  const getSuggestionsData = () =>
    data?.suggestions?.map((suggestion) => suggestion.term) ?? [];

  const options = getSuggestionsData();
  const [products, setProducts] = useState<String[]>(getProductsData());

  const handleSearch: FormEventHandler = (e) => {
    e.preventDefault();
    setProducts(
      getProductsData().filter((product) =>
        product.toLowerCase().includes(value.toLowerCase())
      ) ?? []
    );
  };

  return (
    <Box maxW={1280} mx="auto" px="6">
      <Flex w="100%" my="6" justify="center">
        <FormControl
          as="form"
          onSubmit={handleSearch}
          display="flex"
          justifyContent="center"
        >
          <Hint options={options}>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              style={{ padding: "0.5rem 1rem", borderRadius: "8px" }}
              placeholder="Search a product"
            />
          </Hint>
          <Button
            type="submit"
            leftIcon={<BsSearch />}
            ml="6"
            colorScheme="pink"
          >
            Pesquisar
          </Button>
        </FormControl>
      </Flex>
      <Flex w="100%" justify="center" align="center">
        {isFetching ? (
          <Spinner color="pink.500" size="lg" />
        ) : (
          <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
            {products.map((product) => (
              <Product name={product} />
            ))}
          </SimpleGrid>
        )}
      </Flex>
    </Box>
  );
}
