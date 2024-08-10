import { Text } from "@chakra-ui/react";

const Header = () => {
  return (
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
  );
};

export default Header;
