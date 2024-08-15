import { Container, Stack } from "@chakra-ui/react";
import CatchesGrid from "./components/CatchesGrid";
import Header from "./components/Header";
//import { useState } from "react";

export interface catchQuery {
  sortOrder?: string;
  searchText?: string;
}

function App() {
  /*const [catchQuery /*, setCatchQuery] = useState<catchQuery>(
    {} as catchQuery); */

  return (
    <Stack minH={"100vh"}>
      <Container maxW="1200px" my={4}>
        <Header />
        <CatchesGrid /*catchQuery={catchQuery}*/ />
      </Container>
    </Stack>
  );
}

export default App;
