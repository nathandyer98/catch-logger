import { Box, Grid, Text } from "@chakra-ui/react";
import CatchLog from "./CatchLog";
import useFetchCatch, { FetchCatchLogs } from "../hooks/useFetchCatch";
//import { catchQuery } from "../App";
import AddCatchModal from "./AddCatchModal";
/*
interface Props {
  catchQuery: catchQuery;
}*/

const CatchesGrid = (/*{ catchQuery }: Props*/) => {
  const { catchLog, error, setCatchLog, refetch } = useFetchCatch();
  return (
    <>
      {error ? (
        <Text color="red.500" textAlign="center">
          {error}
        </Text>
      ) : (
        <Grid templateColumns="1fr" gap={1}>
          {catchLog.map((catchLog: FetchCatchLogs) => (
            <CatchLog
              setCatchLog={setCatchLog}
              key={catchLog.id}
              log={catchLog}
            />
          ))}
        </Grid>
      )}
      <Box position="relative" right="-40%" mt={5}>
        <AddCatchModal refetch={refetch} />
      </Box>
    </>
  );
};

export default CatchesGrid;
