import {
  Avatar,
  Badge,
  Card,
  CardHeader,
  Flex,
  IconButton,
  Spinner,
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

  if (isLoading) return <Spinner size="xl" />;

  return (
    <Card
      width="100%"
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
          <Flex justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Flex flexDirection="column">
              <Flex
                flexDirection={{ base: "column", md: "row" }}
                alignItems={{ base: "flex-start", md: "center" }}
                gap={{ base: 2, md: 4 }}
                mb={{ base: 2, md: 0 }}
              >
                <Flex alignItems="center" gap={2}>
                  <Avatar src={catchLog.imgUrl} size="sm" />
                  <Text fontWeight="bold">Angler: {catchLog.name}</Text>
                </Flex>
                <Text>Species: {catchLog.species}</Text>
                <Badge colorScheme={getWeightColor(catchLog.weight)}>
                  {catchLog.weight} lbs
                </Badge>
              </Flex>
            </Flex>
            <Flex
              flexDirection={{ base: "column-reverse", md: "row" }}
              alignItems={{ base: "flex-end", md: "flex-start" }}
              gap={2}
            >
              <Text fontSize="sm" color="gray.500" mt={1.5} mr={2}>
                Date Caught: {new Date(catchLog.dateCaught).toLocaleString()}
              </Text>
              <EditModal
                aria-label="Edit catch details"
                setCatchLog={setCatchLog}
                catchLog={catchLog}
                refetch={refetch}
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
