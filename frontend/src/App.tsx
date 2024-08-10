import { Box, Container, Stack, Text } from "@chakra-ui/react";
// import Navbar from "./components/Navbar";
import CatchesGrid from "./components/CatchesGrid";
import AddCatchModal from "./components/AddCatchModal";
import useFetchCatch from "./hooks/useFetchCatch";
import Header from "./components/Header";

function App() {
  const { catchLog, error, setCatchLog } = useFetchCatch();

  return (
    <Stack minH={"100vh"}>
      <Container maxW="1200px" my={4}>
        <Header />
        {error ? (
          <Text color="red.500" textAlign="center">
            {error}
          </Text>
        ) : (
          <CatchesGrid setCatchLog={setCatchLog} catchLog={catchLog} />
        )}
        <Box position="absolute" bottom="100px" right="100px">
          <AddCatchModal setCatchLog={setCatchLog} />
        </Box>
      </Container>
    </Stack>
  );
}

export default App;
