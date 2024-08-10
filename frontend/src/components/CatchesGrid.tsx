import { Grid } from "@chakra-ui/react";
import CatchLog from "./CatchLog";
import { FetchCatchLogs } from "../hooks/useFetchCatch";

interface Props {
  catchLog: FetchCatchLogs[];
  setCatchLog: React.Dispatch<React.SetStateAction<FetchCatchLogs[]>>;
}

const CatchesGrid = ({ catchLog, setCatchLog }: Props) => {
  return (
    <Grid templateColumns="1fr" gap={1}>
      {catchLog.map((log) => (
        <CatchLog setCatchLog={setCatchLog} key={log.id} log={log} />
      ))}
    </Grid>
  );
};

export default CatchesGrid;
