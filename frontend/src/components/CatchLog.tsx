import {
  Avatar,
  Card,
  CardHeader,
  Flex,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditCatchModal";
import { FetchCatchLogs } from "../hooks/useFetchCatch";
import useDeleteCatch from "../hooks/useDeleteCatch";
import { useState } from "react";

interface Props {
  log: FetchCatchLogs;
  setCatchLog: React.Dispatch<React.SetStateAction<FetchCatchLogs[]>>;
}

const CatchLog = ({ log, setCatchLog }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { deleteCatch, error } = useDeleteCatch();
  const toast = useToast();

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteCatch(id);
      if (error) {
        throw new Error(error);
      }
      setCatchLog((prevState) => prevState.filter((c) => c.id !== log.id));
      toast({
        status: "success",
        title: "Success",
        description: "Catch deleted successfully.",
        duration: 2000,
        position: "top-right",
      });
    } catch (error) {
      toast({
        title: "An error occurred",
        description: String(error),
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card key={log.id} size="sm" my="3px">
      <CardHeader>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center" gap={4} flex="1">
            <Avatar src={log.imgUrl} size="sm" />
            <Text fontWeight="bold">Angler: {log.name}</Text>
            <Text>Species: {log.species}</Text>
            <Text>Weight: {log.weight} lbs</Text>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <EditModal
              aria-label="Edit catch details"
              setCatchLog={setCatchLog}
              log={log}
            />
            <IconButton
              isLoading={isLoading}
              variant="ghost"
              colorScheme="red"
              size="sm"
              aria-label="Delete catch"
              icon={<BiTrash size={20} />}
              onClick={() => {
                handleDelete(log.id);
              }}
            />
          </Flex>
        </Flex>
      </CardHeader>
    </Card>
  );
};

export default CatchLog;
