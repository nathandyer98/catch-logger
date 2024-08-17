import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Grid,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import CatchLog from "./CatchLog";
import useFetchCatch, { FetchCatchLogs } from "../hooks/useFetchCatch";
import { CatchQuery } from "../App";
import AddCatchModal from "./AddCatchModal";
import FilterUser from "./FilterUser";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaBug, FaRulerHorizontal } from "react-icons/fa6";
import { GiFishingHook } from "react-icons/gi";

interface Props {
  catchQuery: CatchQuery;
  onFilterUser: (name: string) => void;
  name: string;
}

const CatchesGrid = ({ catchQuery, onFilterUser, name }: Props) => {
  const { catchLog, error, setCatchLog, refetch } = useFetchCatch(catchQuery);

  if (error)
    return (
      <Text color="red.500" textAlign="center">
        {error}
      </Text>
    );

  return (
    <>
      <Box mb={3}>
        <FilterUser
          catchLog={catchLog}
          onFilterUser={onFilterUser}
          name={name}
        />
      </Box>
      <Grid templateColumns="1fr" gap={1}>
        <Accordion allowMultiple>
          {catchLog.map((catchLog: FetchCatchLogs) => (
            <AccordionItem border="none" m={-4}>
              <AccordionButton>
                <CatchLog
                  setCatchLog={setCatchLog}
                  key={catchLog.id}
                  catchLog={catchLog}
                  refetch={refetch}
                />
              </AccordionButton>
              {catchLog.rigInfo != undefined ||
              catchLog.baitInfo != undefined ||
              catchLog.distance != undefined ||
              catchLog.location != undefined ||
              catchLog.comments ? (
                <AccordionPanel pb={5}>
                  <Wrap spacing={4}>
                    {catchLog.rigInfo && (
                      <WrapItem>
                        <Tag size="lg" variant="subtle" colorScheme="blue">
                          <TagLeftIcon as={GiFishingHook} />
                          <TagLabel fontWeight="bold" mr={2}>
                            Rig:
                          </TagLabel>
                          <TagLabel>{catchLog.rigInfo}</TagLabel>
                        </Tag>
                      </WrapItem>
                    )}
                    {catchLog.baitInfo && (
                      <WrapItem>
                        <Tag size="lg" variant="subtle" colorScheme="green">
                          <TagLeftIcon as={FaBug} />
                          <TagLabel fontWeight="bold" mr={2}>
                            Bait:
                          </TagLabel>
                          <TagLabel>{catchLog.baitInfo}</TagLabel>
                        </Tag>
                      </WrapItem>
                    )}
                    {catchLog.distance && (
                      <WrapItem>
                        <Tag size="lg" variant="subtle" colorScheme="purple">
                          <TagLeftIcon as={FaRulerHorizontal} />
                          <TagLabel fontWeight="bold" mr={2}>
                            Distance:
                          </TagLabel>
                          <TagLabel>{catchLog.distance}</TagLabel>
                        </Tag>
                      </WrapItem>
                    )}
                    {catchLog.location && (
                      <WrapItem>
                        <Tag size="lg" variant="subtle" colorScheme="orange">
                          <TagLeftIcon as={FaMapMarkerAlt} />
                          <TagLabel fontWeight="bold" mr={2}>
                            Location:
                          </TagLabel>
                          <TagLabel>{catchLog.location}</TagLabel>
                        </Tag>
                      </WrapItem>
                    )}
                  </Wrap>
                  {catchLog.comments && (
                    <Box mt={4}>
                      <Text fontWeight="bold">Comments:</Text>
                      <Text>{catchLog.comments}</Text>
                    </Box>
                  )}
                </AccordionPanel>
              ) : (
                <AccordionPanel pb={5} justifyContent="center">
                  No additional information
                </AccordionPanel>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </Grid>
      <Box position="relative" right="-45%" mt={5}>
        <AddCatchModal refetch={refetch} />
      </Box>
    </>
  );
};

export default CatchesGrid;
