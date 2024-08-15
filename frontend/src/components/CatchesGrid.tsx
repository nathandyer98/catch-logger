import { Box, Grid, Text } from "@chakra-ui/react";
import CatchLog from "./CatchLog";
import useFetchCatch, { FetchCatchLogs } from "../hooks/useFetchCatch";
import { CatchQuery } from "../App";
import AddCatchModal from "./AddCatchModal";
import CatchesLogSkeletons from "./CatchesLogSkeletons";

interface Props {
  catchQuery: CatchQuery;
}

const CatchesGrid = ({ catchQuery }: Props) => {
  const { catchLog, error, setCatchLog, isLoading, refetch } =
    useFetchCatch(catchQuery);
  const skeletons = [1, 2, 3];

  if (error)
    return (
      <Text color="red.500" textAlign="center">
        {error}
      </Text>
    );

  return (
    <>
      {isLoading &&
        skeletons.map((skeleton) => (
          <CatchesLogSkeletons key={skeleton}></CatchesLogSkeletons>
        ))}
      <Grid templateColumns="1fr" gap={1}>
        {catchLog.map((catchLog: FetchCatchLogs) => (
          <CatchLog
            setCatchLog={setCatchLog}
            key={catchLog.id}
            catchLog={catchLog}
            refetch={refetch}
          />
        ))}
      </Grid>
      <Box position="relative" right="-40%" mt={5}>
        <AddCatchModal setCatchLog={setCatchLog} refetch={refetch} />
      </Box>
    </>
  );
};

export default CatchesGrid;
