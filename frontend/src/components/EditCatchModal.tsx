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
import { BiEditAlt } from "react-icons/bi";
import { FishSpecies } from "../enum/FishSpecies";
import { FetchCatchLogs } from "../hooks/useFetchCatch";
import useUpdateCatch from "../hooks/useUpdateCatch";

interface Props {
  catchLog: FetchCatchLogs;
  setCatchLog: React.Dispatch<React.SetStateAction<FetchCatchLogs[]>>;
}

const EditCatchModal = ({ catchLog, setCatchLog }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    id: catchLog.id,
    name: catchLog.name,
    species: catchLog.species as FishSpecies,
    weight: catchLog.weight,
    dateCaught: catchLog.dateCaught,
  });

  const { updateCatch, error } = useUpdateCatch();
  const toast = useToast();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const data = await updateCatch(inputs.id, inputs);
      if (
        inputs.name == "" ||
        inputs.species == ("" as FishSpecies) ||
        inputs.weight == Number("")
      ) {
        throw new Error(error);
      }
      setCatchLog((prevState) =>
        prevState.map((l) =>
          l.id === catchLog.id ? (data as FetchCatchLogs) : l
        )
      );
      toast({
        status: "success",
        title: "Catch Updated! 🎉",
        description: `${catchLog.name}'s has been updated successfully!`,
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
    }
  };

  return (
    <>
      <Button onClick={onOpen} size="sm">
        <BiEditAlt size={10} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Edit Catch : {catchLog.id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <FormLabel>Full Name</FormLabel>
                <Input
                  placeholder="John Doe"
                  value={inputs.name}
                  onChange={(e) =>
                    setInputs({ ...inputs, name: e.target.value })
                  }
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Species</FormLabel>
                <Select
                  onChange={(e) =>
                    setInputs({
                      ...inputs,
                      species: e.target.value as FishSpecies,
                    })
                  }
                  value={inputs.species}
                >
                  {Object.values(FishSpecies).map((key, index) => (
                    <option value={key} key={`${key}-${index}`}>
                      {key}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Weight (lb)</FormLabel>
                <Input
                  resize={"none"}
                  overflowY={"hidden"}
                  placeholder="123"
                  value={inputs.weight}
                  onChange={(e) =>
                    setInputs({ ...inputs, weight: parseInt(e.target.value) })
                  }
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Date / Time of Catch</FormLabel>
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                  value={inputs.dateCaught}
                  onChange={(e) => {
                    if (e.target.value) {
                      setInputs({
                        ...inputs,
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
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditCatchModal;
