import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Spinner,
  Text,
  HStack,
} from "@chakra-ui/react";
import { Search } from "../components/search";
import { api } from "../services/api";
import { useDebounce } from "../hooks/useDebbounce";
import { Product } from "../components/product";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      searchCharacters(debouncedSearchTerm);
    } else {
      setSuggestions([]);
      setIsSearching(false);
    }
  }, [debouncedSearchTerm]);

  const searchCharacters = async (search) => {
    setIsSearching(true);
    const response = await api.get("autocomplete", {
      params: {
        content: search,
        source: "nanook",
      },
    });
    setIsSearching(false);
    setSuggestions(response?.data.suggestions?.map((element) => element.term));
  };

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!searchTerm) return;
    const response = await api.get("autocomplete", {
      params: {
        content: searchTerm,
        source: "nanook",
      },
    });
    setProducts(response?.data.products?.map((element) => element.name));
  };

  return (
    <Box maxW={1280} mx="auto" px="6">
      <Search
        handleSearch={handleSearch}
        options={suggestions}
        value={searchTerm}
        setValue={setSearchTerm}
      />
      <HStack gridGap="3" w="100%" flexWrap="wrap" mb="5">
        {suggestions.map((suggestion) => (
          <Button
            data-cy="suggestion"
            key={`key-${suggestion}`}
            onClick={() => {
              setSearchTerm(suggestion);
              handleSearch();
            }}
            variant="outline"
            colorScheme="purple"
            _hover={{ bg: "purple.500", color: "gray.50" }}
          >
            {suggestion}
          </Button>
        ))}
      </HStack>

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
        {isSearching && <Spinner color="pink.500" size="md" ml="2" />}
      </Flex>

      <Flex w="100%" justify="center" align="center">
        <SimpleGrid flex="1" gap="4" minChildWidth="300px" align="flex-start">
          {products.map((product) => (
            <Product key={`product-${product}`} name={product} />
          ))}
        </SimpleGrid>
      </Flex>
    </Box>
  );
}
