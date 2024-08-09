import { Box, Container, Stack, Text } from "@chakra-ui/react";
// import Navbar from "./components/Navbar";
import CatchesGrid from "./components/CatchesGrid";
import AddCatchModal from "./components/AddCatchModal";
import useCatch from "./hooks/useCatch";

function App() {
  const { catchLog, error } = useCatch();

  return (
    <Stack minH={"100vh"}>
      <Container maxW="1200px" my={4}>
        <Text
          fontSize={{ base: "3xl", md: "5xl" }}
          fontWeight={"bold"}
          letterSpacing={"2px"}
          textTransform={"uppercase"}
          textAlign={"center"}
          mb={8}
        >
          <Text
            as={"span"}
            bgGradient={"linear(to-r, green.500, blue.200)"}
            bgClip={"text"}
          >
            My Catches
          </Text>
          🎣
        </Text>
        {error ? (
          <Text color="red.500" textAlign="center">
            {error}
          </Text>
        ) : (
          <CatchesGrid catchLog={catchLog} />
        )}
        <Box position="absolute" bottom="100px" right="100px">
          <AddCatchModal />
        </Box>
      </Container>
    </Stack>
  );
}

export default App;
