import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

interface Props {
  onSelectSortOrder: (sortOrder: string) => void;
  sortBy: string;
}

const SortSelector = ({ onSelectSortOrder, sortBy }: Props) => {
  const sortOrders = [
    { value: "date", label: "Date Caught" },
    { value: "name", label: "Name" },
    { value: "-weight", label: "Weight" },
  ];

  const currentSortOrder = sortOrders.find((order) => order.value === sortBy);

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Order By: {currentSortOrder?.label || "Date Caught"}
      </MenuButton>
      <MenuList>
        {sortOrders.map((order) => (
          <MenuItem
            onClick={() => onSelectSortOrder(order.value)}
            key={order.value}
            value={order.value}
          >
            {order.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
