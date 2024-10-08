import { Accordion, Box, Grid, Text } from "@chakra-ui/react";
import CatchLog from "./CatchLog";
import useFetchCatch, { FetchCatchLogs } from "../hooks/useFetchCatch";
import { CatchQuery } from "../App";
import AddCatchModal from "./AddCatchModal";
import FilterUser from "./FilterUser";
import AdditionalInfo from "./AdditionalInfo";

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
      {catchLog.length === 0 && (
        <Text fontSize={20} textAlign="center" mb={5}>
          No catches yet 🙁
        </Text>
      )}
      <Grid templateColumns="1fr" gap={1}>
        <Accordion allowMultiple>
          {catchLog.map((catchLog: FetchCatchLogs) => (
            <AdditionalInfo catchLog={catchLog}>
              <CatchLog
                setCatchLog={setCatchLog}
                key={catchLog.id}
                catchLog={catchLog}
                refetch={refetch}
              />
            </AdditionalInfo>
          ))}
        </Accordion>
      </Grid>
      <Box
        position="relative"
        mt={5}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <AddCatchModal refetch={refetch} />
      </Box>
    </>
  );
};

export default CatchesGrid;
