import { Grid } from "@chakra-ui/react";
import { CATCHES } from "../dummy";
import CatchLog from "./CatchLog";

const CatchesGrid = () => {
  return (
    <Grid templateColumns="1fr">
      {CATCHES.map((log) => (
        <CatchLog key={log.id} log={log} />
      ))}
    </Grid>
  );
};

export default CatchesGrid;
