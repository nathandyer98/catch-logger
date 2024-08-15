import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const CatchesLogSkeletons = () => {
  return (
    <Card size="sm" my="7px">
      <Skeleton height="8px" />
      <CardBody>
        <SkeletonText />
      </CardBody>
    </Card>
  );
};

export default CatchesLogSkeletons;
