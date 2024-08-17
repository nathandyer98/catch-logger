import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { FishSpecies } from "../enum/FishSpecies";
import useCreateCatch, { CreateCatchLog } from "../hooks/useCreateCatch";
import { FaFishFins } from "react-icons/fa6";

interface Props {
  refetch: () => void;
}

const DefaultCatch = {
  name: "",
  species: "" as FishSpecies,
  weight: Number(),
  date_caught: new Date().toISOString().slice(0, 16),
  rig_info: undefined,
  bait_info: undefined,
  distance: undefined,
  location: undefined,
  comments: undefined,
};

const AddCatchModal = ({ refetch }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [newCatch, setNewCatch] = useState<CreateCatchLog>(DefaultCatch);
  const [moreInfo, setMoreInfo] = useState(false);

  const { createCatch, error } = useCreateCatch();
  const toast = useToast();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await createCatch(newCatch);
      if (
        newCatch.name == "" ||
        newCatch.species == ("" as FishSpecies) ||
        newCatch.weight == Number("")
      ) {
        throw new Error(error);
      }
      refetch();
      toast({
        status: "success",
        title: "Congrats! 🎉",
        description: "A new catch has been added!",
        duration: 2000,
        position: "top-left",
      });
      onClose();
    } catch (e) {
      toast({
        status: "error",
        title: "An error occurred. Missing form data",
        description: String(e),
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
      setNewCatch(DefaultCatch);
      setMoreInfo(false);
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="blue"
        size="lg"
        borderRadius="full"
        boxShadow="lg"
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "xl",
        }}
        transition="all 0.2s"
      >
        <Icon as={FaFishFins} boxSize={6} mr={2} />
        Add Catch
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"outside"}>
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
                  value={newCatch.date_caught}
                  onChange={(e) => {
                    console.log(
                      new Date(e.target.value).toISOString().slice(0, 16)
                    );
                    if (e.target.value) {
                      setNewCatch({
                        ...newCatch,
                        date_caught: new Date(e.target.value)
                          .toISOString()
                          .slice(0, 16),
                      });
                    }
                  }}
                />
              </FormControl>
              {moreInfo && (
                <>
                  <FormControl mt={4}>
                    <FormLabel>Rig</FormLabel>
                    <Input
                      placeholder='6" Spinner Rig'
                      value={newCatch.rig_info}
                      onChange={(e) =>
                        setNewCatch({ ...newCatch, rig_info: e.target.value })
                      }
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Bait</FormLabel>
                    <Input
                      placeholder="DNA Bug Dumbell Wafters 14x18mm"
                      value={newCatch.bait_info}
                      onChange={(e) =>
                        setNewCatch({ ...newCatch, bait_info: e.target.value })
                      }
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Distance</FormLabel>
                    <Input
                      placeholder="15 Wraps"
                      value={newCatch.distance}
                      onChange={(e) =>
                        setNewCatch({ ...newCatch, distance: e.target.value })
                      }
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Location</FormLabel>
                    <Input
                      placeholder="Close Left-side margin under the willow"
                      value={newCatch.location}
                      onChange={(e) =>
                        setNewCatch({ ...newCatch, location: e.target.value })
                      }
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Additional Comments</FormLabel>
                    <Textarea
                      overflow="hidden"
                      resize="none"
                      placeholder="Fished over a bed of baits and used 2 spombs every 2 hours..."
                      value={newCatch.comments}
                      onChange={(e) =>
                        setNewCatch({ ...newCatch, comments: e.target.value })
                      }
                    />
                  </FormControl>
                </>
              )}
            </ModalBody>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="gray"
              variant="outline"
              mr={3}
              onClick={() => {
                setMoreInfo(!moreInfo);
              }}
            >
              {!moreInfo ? "More info" : "Collapse"}
            </Button>
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
                setMoreInfo(false);
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
