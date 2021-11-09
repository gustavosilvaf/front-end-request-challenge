import { Flex, FormControl, Button } from "@chakra-ui/react";
import { Hint } from "react-autocomplete-hint";
import { BsSearch } from "react-icons/bs";

interface SearchProps {
  handleSearch: (e: React.FormEvent) => void;
  options: string[];
  value: string;
  setValue: (value: string) => void;
}

export const Search = ({
  handleSearch,
  options,
  value,
  setValue,
}: SearchProps) => {
  return (
    <Flex w="100%" my="6" justify="center" flexWrap="wrap">
      <FormControl
        as="form"
        onSubmit={handleSearch}
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        gridGap="2"
      >
        <Hint options={options}>
          <input
            data-cy="search-input"
            width="100%"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ padding: "0.5rem 1rem", borderRadius: "8px" }}
            placeholder="Search a product"
          />
        </Hint>
        <Button
          type="submit"
          leftIcon={<BsSearch />}
          colorScheme="pink"
          data-cy="submit"
        >
          Search
        </Button>
      </FormControl>
    </Flex>
  );
};
