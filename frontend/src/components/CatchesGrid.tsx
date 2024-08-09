import { Grid } from "@chakra-ui/react";
import CatchLog from "./CatchLog";
import { Log } from "../hooks/useCatch";

interface Props {
  catchLog: Log[];
}

const CatchesGrid = ({ catchLog }: Props) => {
  return (
    <Grid templateColumns="1fr" gap={1}>
      {catchLog.map((log) => (
        <CatchLog key={log.id} log={log} />
      ))}
    </Grid>
  );
};

export default CatchesGrid;
