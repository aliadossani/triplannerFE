import { Container, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

function Search({ searchTerm, setSearchTerm }) {
  return (
    <Container>
      <TextInput
        leftSection={<IconSearch size="1rem" stroke={1.5} />}
        variant="filled"
        size="md"
        radius="xl"
        placeholder="Search grocery"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
    </Container>
  );
}

export default Search;
