import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";

export const LayoutDashboard: React.FC<{ title: string }> = ({
  children,
  title,
}) => {
  return (
    <Box>
      <Flex
        h="70px"
        elevation={2}
        shadow="md"
        align="center"
        px={5}
        justify="center"
      >
        <Box maxWidth="8xl" width="100%">
          <Flex>
            <IconButton
              aria-label="Menu"
              bgColor="transparent"
              borderRadius="circle"
              icon={<FaBars />}
            />
            <Spacer></Spacer>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Profile"
                bgColor="transparent"
                isRound
                icon={<Avatar size="sm" />}
              ></MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Box>
      </Flex>
      <Box minHeight="800px" maxWidth="8xl" px={5} mt={8} width="100%">
        <Heading fontSize="4xl" fontWeight="regular">
          {title}
        </Heading>
        <Breadcrumb>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        {children}
      </Box>
    </Box>
  );
};
