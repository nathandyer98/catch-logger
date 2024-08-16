import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { FetchCatchLogs } from "../hooks/useFetchCatch";

interface Props {
  onFilterUser: (name: string) => void;
  name: string;
  catchLog: FetchCatchLogs[];
}

const FilterUser = ({ catchLog, onFilterUser, name = "" }: Props) => {
  const users = ["", ...new Set(catchLog.map((log) => log.name))];

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {name == "" ? "All" : name + "'s"} Catches
      </MenuButton>
      <MenuList>
        {users.map((user) => (
          <MenuItem onClick={() => onFilterUser(user)} key={user} value={user}>
            {user == "" ? "All" : user}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default FilterUser;
