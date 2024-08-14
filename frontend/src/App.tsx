import {
  Box,
  Button,
  Container,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
// import Navbar from "./components/Navbar";
import CatchesGrid from "./components/CatchesGrid";
import AddCatchModal from "./components/AddCatchModal";
import Header from "./components/Header";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import useFetchCatch from "./hooks/useFetchCatch";

function App() {
  const { catchLog, error, setCatchLog } = useFetchCatch();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Stack minH={"100vh"}>
      <Container maxW="1200px" my={4}>
        <Button
          position="fixed"
          top="20px"
          left="20px"
          onClick={toggleColorMode}
        >
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Header />
        {error ? (
          <Text color="red.500" textAlign="center">
            {error}
          </Text>
        ) : (
          <CatchesGrid setCatchLog={setCatchLog} catchLog={catchLog} />
        )}
        <Box position="fixed" top="20px" right="20px">
          <AddCatchModal setCatchLog={setCatchLog} />
        </Box>
      </Container>
    </Stack>
  );
}

export default App;
