import { Container, Stack } from "@chakra-ui/react";
import CatchesGrid from "./components/CatchesGrid";
import Header from "./components/Header";
import { useState } from "react";

export interface CatchQuery {
  sortBy: string;
  searchText?: string;
}

function App() {
  const [catchQuery, setCatchQuery] = useState<CatchQuery>({} as CatchQuery);

  return (
    <Stack minH={"100vh"}>
      <Container maxW="1200px" my={4}>
        <Header
          sortBy={catchQuery.sortBy}
          onSelectSortOrder={(sortBy) =>
            setCatchQuery({ ...catchQuery, sortBy })
          }
        />
        <CatchesGrid catchQuery={catchQuery} />
      </Container>
    </Stack>
  );
}

export default App;
