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
} from "@chakra-ui/react";
import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { FishSpecies } from "../enum/FishSpecies";

const AddCatchModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    species: "",
    weight: 0,
    gender: "",
  });

  return (
    <>
      <Button onClick={onOpen} size="sm">
        <BiEditAlt size={10} />
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
                  value={inputs.name}
                  onChange={(e) =>
                    setInputs({ ...inputs, name: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Species</FormLabel>
                <Select placeholder="Select Species">
                  {(
                    Object.keys(FishSpecies) as Array<keyof typeof FishSpecies>
                  ).map((key) => (
                    <option
                      onSelect={() => setInputs({ ...inputs, species: key })}
                      value={key}
                    >
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
                  value={inputs.weight}
                  onChange={(e) =>
                    setInputs({ ...inputs, weight: parseInt(e.target.value) })
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
            >
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddCatchModal;
