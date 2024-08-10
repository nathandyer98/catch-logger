import {
  Avatar,
  Card,
  CardHeader,
  Flex,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditCatchModal";
import { FetchCatchLogs } from "../hooks/useFetchCatch";

interface Props {
  log: FetchCatchLogs;
}
const CatchLog = ({ log }: Props) => {
  return (
    <Card size="sm" my="3px">
      <CardHeader>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center" gap={4} flex="1">
            <Avatar src={log.imgUrl} size="sm" />
            <Text fontWeight="bold">Angler: {log.name}</Text>
            <Text>Species: {log.species}</Text>
            <Text>Weight: {log.weight} lbs</Text>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <EditModal aria-label="Edit catch details" />
            <IconButton
              variant="ghost"
              colorScheme="red"
              size="sm"
              aria-label="Delete catch"
              icon={<BiTrash size={20} />}
            />
          </Flex>
        </Flex>
      </CardHeader>
    </Card>
  );
};

export default CatchLog;
