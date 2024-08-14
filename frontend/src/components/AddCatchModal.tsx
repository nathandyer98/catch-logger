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

const DefaultCatch = {
  name: "",
  species: "" as FishSpecies,
  weight: Number(),
  dateCaught: new Date().toISOString().slice(0, 16),
};

const AddCatchModal = ({ setCatchLog }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [newCatch, setNewCatch] = useState<CreateCatchLog>(DefaultCatch);

  const { createCatch, error } = useCreateCatch();
  const toast = useToast();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const data = await createCatch(newCatch);
      if (
        error ||
        newCatch.name == "" ||
        newCatch.species == ("" as FishSpecies) ||
        newCatch.weight == Number("")
      ) {
        throw new Error(error);
      }
      setCatchLog((prevState) => [...prevState, data as FetchCatchLogs]);
      toast({
        status: "success",
        title: "Congrats! 🎉",
        description: "A new catch has been added!",
        duration: 2000,
        position: "top-left",
      });
      onClose();
    } catch (e) {
      console.error("Error adding catch:", e);
      toast({
        status: "error",
        title: "An error occurred. Missing form data",
        description: String(e),
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
      setNewCatch(DefaultCatch);
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
              <FormControl mt={4}>
                <FormLabel>Full Name</FormLabel>
                <Input
                  placeholder="John Doe"
                  value={newCatch.name}
                  onChange={(e) =>
                    setNewCatch({ ...newCatch, name: e.target.value })
                  }
                />
              </FormControl>
              <FormControl mt={4}>
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
                <FormLabel>Weight ( lb )</FormLabel>
                <Input
                  type="number"
                  resize={"none"}
                  overflowY={"hidden"}
                  placeholder="45"
                  value={newCatch.weight}
                  onChange={(e) =>
                    setNewCatch({
                      ...newCatch,
                      weight: parseInt(e.target.value),
                    })
                  }
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Date / Time of Catch</FormLabel>
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                  value={newCatch.dateCaught}
                  onChange={(e) => {
                    if (e.target.value) {
                      setNewCatch({
                        ...newCatch,
                        dateCaught: new Date(e.target.value)
                          .toISOString()
                          .slice(0, 16),
                      });
                    }
                  }}
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
                setNewCatch(DefaultCatch);
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
