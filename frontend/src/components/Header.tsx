import { Text, Button, useColorMode, Flex, Box } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaFish } from "react-icons/fa";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg={colorMode === "light" ? "blue.50" : "blue.900"}
      color={colorMode === "light" ? "blue.700" : "blue.100"}
      boxShadow="md"
      borderRadius={5}
      mb={5}
    >
      <Flex align="center">
        <FaFish
          size="2rem"
          color={colorMode === "light" ? "#3182CE" : "#63B3ED"}
        />
        <Text
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          fontWeight="bold"
          letterSpacing="wide"
          textTransform="uppercase"
          ml={3}
        >
          <Text
            as="span"
            bgGradient={
              colorMode === "light"
                ? "linear(to-r, blue.400, teal.300)"
                : "linear(to-r, blue.200, teal.100)"
            }
            bgClip="text"
          >
            Catch Log
          </Text>
        </Text>
      </Flex>

      <Box>
        <Button
          onClick={toggleColorMode}
          bg={colorMode === "light" ? "blue.100" : "blue.700"}
          color={colorMode === "light" ? "blue.700" : "blue.100"}
          _hover={{
            bg: colorMode === "light" ? "blue.200" : "blue.600",
          }}
        >
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Box>
    </Flex>
  );
};

export default Header;
