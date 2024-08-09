import {
  Avatar,
  Card,
  CardHeader,
  Flex,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { FishSpecies } from "../enum/FishSpecies";
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditCatchModal";

export interface Log {
  name: string;
  species: FishSpecies;
  weight: number;
  url: string;
}

interface Props {
  key: number;
  log: Log;
}

const CatchLog = ({ key, log }: Props) => {
  return (
    <Card key={key} size="sm" my="3px">
      <CardHeader>
        <Flex justifyContent="space-between">
          <Flex minW="90%" justifyContent="space-between" paddingRight={10}>
            <Avatar src={log.url} size="sm" />
            <Text>Angler: {log.name} </Text>
            <Text>Species: {log.species} </Text>
            <Text>Weight: {log.weight} </Text>
          </Flex>
          <Flex minW="5%" justifyContent="space-between">
            <EditModal />
            <IconButton
              variant="ghost"
              colorScheme="red"
              size={"sm"}
              aria-label="See menu"
              icon={<BiTrash size={20} />}
            />
          </Flex>
        </Flex>
      </CardHeader>
    </Card>
  );
};

export default CatchLog;
