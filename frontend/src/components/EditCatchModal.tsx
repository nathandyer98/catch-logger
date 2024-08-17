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
  Textarea,
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
  refetch: () => void;
}

const EditCatchModal = ({ catchLog, setCatchLog, refetch }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [moreInfo, setMoreInfo] = useState(false);
  const [inputs, setInputs] = useState({
    id: catchLog.id,
    name: catchLog.name,
    species: catchLog.species as FishSpecies,
    weight: catchLog.weight,
    date_caught: catchLog.dateCaught,
    rig_info: catchLog.rigInfo,
    bait_info: catchLog.baitInfo,
    distance: catchLog.distance,
    location: catchLog.location,
    comments: catchLog.comments,
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
      refetch();
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
      setMoreInfo(false);
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
          <ModalHeader> Edit Catch : {catchLog.name}</ModalHeader>
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
                  value={inputs.date_caught}
                  onChange={(e) => {
                    if (e.target.value) {
                      setInputs({
                        ...inputs,
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
                      value={inputs.rig_info}
                      onChange={(e) =>
                        setInputs({ ...inputs, rig_info: e.target.value })
                      }
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Bait</FormLabel>
                    <Input
                      placeholder="DNA Bug Dumbell Wafters 14x18mm"
                      value={inputs.bait_info}
                      onChange={(e) =>
                        setInputs({ ...inputs, bait_info: e.target.value })
                      }
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Distance</FormLabel>
                    <Input
                      placeholder="15 Wraps"
                      value={inputs.distance}
                      onChange={(e) =>
                        setInputs({ ...inputs, distance: e.target.value })
                      }
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Location</FormLabel>
                    <Input
                      placeholder="Close Left-side margin under the willow"
                      value={inputs.location}
                      onChange={(e) =>
                        setInputs({ ...inputs, location: e.target.value })
                      }
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Additional Comments</FormLabel>
                    <Textarea
                      overflow="hidden"
                      resize="none"
                      placeholder="Fished over a bed of baits and used 2 spombs every 2 hours..."
                      value={inputs.comments}
                      onChange={(e) =>
                        setInputs({ ...inputs, comments: e.target.value })
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
              Update
            </Button>
            <Button
              onClick={() => {
                onClose();
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

export default EditCatchModal;
