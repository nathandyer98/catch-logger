import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Wrap,
  WrapItem,
  Tag,
  TagLeftIcon,
  TagLabel,
  Box,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaBug, FaRulerHorizontal } from "react-icons/fa6";
import { GiFishingHook } from "react-icons/gi";
import { FetchCatchLogs } from "../hooks/useFetchCatch";

interface Props {
  children: React.ReactNode;
  catchLog: FetchCatchLogs;
}

const AdditionalInfo = ({ catchLog, children }: Props) => {
  return (
    <>
      {" "}
      <AccordionItem border="none" m={-4}>
        <AccordionButton>{children}</AccordionButton>
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
            <Text fontStyle="oblique">No additional information</Text>
          </AccordionPanel>
        )}
      </AccordionItem>
    </>
  );
};

export default AdditionalInfo;
