import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { FishSpecies } from "../enum/FishSpecies";
import { FetchCatchLogs } from "../hooks/useFetchCatch";
import useCreateCatch, { CreateCatchLog } from "../hooks/useCreateCatch";

interface Props {
  setCatchLog: React.Dispatch<React.SetStateAction<FetchCatchLogs[]>>;
}

const AddCatchModal = ({ setCatchLog }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [newCatch, setNewCatch] = useState<CreateCatchLog>({
    name: "",
    species: "" as FishSpecies,
    weight: 0,
  });

  const { createCatch, error } = useCreateCatch();
  const toast = useToast();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const data = await createCatch(newCatch);
      if (
        newCatch.name != "" &&
        newCatch.species != ("" as FishSpecies) &&
        newCatch.weight != 0
      ) {
        setCatchLog((prevState) => [...prevState, data as FetchCatchLogs]);
        toast({
          status: "success",
          title: "Congrats! 🎉",
          description: "A new catch has been added!",
          duration: 2000,
          position: "top-left",
        });
      } else {
        throw new Error(error);
      }
      onClose();
    } catch (e) {
      console.error("Error adding catch:", e);
      toast({
        status: "error",
        title: "An error occurred.",
        description: String(e),
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
      setNewCatch({ name: "", species: "" as FishSpecies, weight: 0 });
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" size="lg">
        <BiAddToQueue size={40} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Add a new Catch </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input
                  placeholder="John Doe"
                  value={newCatch.name}
                  onChange={(e) =>
                    setNewCatch({ ...newCatch, name: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Species</FormLabel>
                <Select
                  placeholder="Select Species"
                  onChange={(e) =>
                    setNewCatch({
                      ...newCatch,
                      species: e.target.value as FishSpecies,
                    })
                  }
                  value={newCatch.species}
                >
                  {Object.values(FishSpecies).map((key, index) => (
                    <option value={key} key={`${key}-${index}`}>
                      {key}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Weight</FormLabel>
                <Input
                  resize={"none"}
                  overflowY={"hidden"}
                  placeholder="123"
                  value={newCatch.weight}
                  onChange={(e) =>
                    setNewCatch({
                      ...newCatch,
                      weight: parseInt(e.target.value),
                    })
                  }
                />
              </FormControl>
            </ModalBody>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              type="submit"
              isLoading={isLoading}
              onClick={handleSubmit}
            >
              Add
            </Button>
            <Button
              onClick={() => {
                onClose();
                setNewCatch({
                  name: "",
                  species: "" as FishSpecies,
                  weight: 0,
                });
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddCatchModal;
