import { Box, TextField } from "@radix-ui/themes";

interface SearchInputProps {
  handleSearchInput: (arg0: string) => void;
}

const SearchInput = (props: SearchInputProps) => {
  const { handleSearchInput } = props;
  return (
    <div className="lists-container">
      <Box maxWidth="250px">
        <TextField.Root
          placeholder="Search the docs…"
          size="2"
          onChange={(e) => handleSearchInput(e.target.value)}
        />
      </Box>
    </div>
  );
};

export default SearchInput;
