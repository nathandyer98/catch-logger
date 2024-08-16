import {
  Avatar,
  Badge,
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
import { getWeightColor } from "../utility/getWeightColor";

interface Props {
  catchLog: FetchCatchLogs;
  setCatchLog: React.Dispatch<React.SetStateAction<FetchCatchLogs[]>>;
  refetch: () => void;
}

const CatchLog = ({ catchLog, setCatchLog, refetch }: Props) => {
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
      setCatchLog((prevState) => prevState.filter((c) => c.id !== catchLog.id));
      refetch();
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
    }
  };

  return (
    <Card
      key={catchLog.id}
      size="sm"
      my="3px"
      transition="all 0.2s"
      _hover={{
        boxShadow: "md",
        transform: "translateY(-2px)",
        cursor: "pointer",
      }}
    >
      <CardHeader>
        <Flex flexDirection="column" justifyContent="space-between">
          <Flex justifyContent="space-between" alignItems="center" mb={2}>
            <Flex alignItems="center" gap={4} flex="1">
              <Flex w="3%">
                <Avatar src={catchLog.imgUrl} size="sm" />
              </Flex>
              <Flex w="15%">
                <Text fontWeight="bold">Angler: {catchLog.name}</Text>
              </Flex>
              <Flex w="12%">
                <Text>Species: {catchLog.species}</Text>
              </Flex>
              <Flex w="15%">
                <Badge colorScheme={getWeightColor(catchLog.weight)}>
                  {catchLog.weight} lbs
                </Badge>
              </Flex>
            </Flex>
            <Flex pr="20px">
              <Text fontSize="sm" color="gray.500">
                Date Caught: {new Date(catchLog.dateCaught).toLocaleString()}
              </Text>
            </Flex>
            <Flex alignItems="center" gap={2}>
              <EditModal
                aria-label="Edit catch details"
                setCatchLog={setCatchLog}
                catchLog={catchLog}
              />
              <IconButton
                variant="ghost"
                colorScheme="red"
                size="sm"
                aria-label="Delete catch"
                icon={<BiTrash size={20} />}
                onClick={() => {
                  handleDelete(catchLog.id);
                }}
              />
            </Flex>
          </Flex>
        </Flex>
      </CardHeader>
    </Card>
  );
};

export default CatchLog;
