import {
  Avatar,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaBars } from "react-icons/fa";
import { Sidebar } from "./Sidebar";
import { menus } from "./Menus";

type LayoutDashboardProps = {
  title: string;
  breadcrumbs?: { text: string; href: string; isCurrentPage?: boolean }[];
};

export const LayoutDashboard: React.FC<LayoutDashboardProps> = ({
  children,
  title,
  breadcrumbs = [],
}) => {
  const {
    isOpen: menuIsOpen,
    onOpen: setMenuIsOpen,
    onClose: setMenuIsClose,
  } = useDisclosure({ defaultIsOpen: false });

  return (
    <VStack>
      <Flex
        h="70px"
        elevation={2}
        shadow="md"
        align="center"
        px={5}
        justify="center"
        bgColor="white"
        width="100%"
      >
        <Box maxWidth="8xl" width="100%">
          <Flex>
            <IconButton
              aria-label="Menu"
              bgColor="transparent"
              borderRadius="circle"
              icon={<FaBars />}
              onClick={() => {
                if (menuIsOpen) {
                  setMenuIsClose();
                } else {
                  setMenuIsOpen();
                }
              }}
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
      <Box align="top" minH="100vh" bgColor="gray.50" width="100%">
        <Sidebar
          menuIsOpen={menuIsOpen}
          setMenuIsOpen={setMenuIsOpen}
          setMenuIsClose={setMenuIsClose}
          menus={menus}
        ></Sidebar>
        <Box maxWidth="8xl" width="100%" px={5} py={5}>
          <Heading fontSize="4xl" fontWeight="semibold">
            {title}
          </Heading>
          <Breadcrumb>
            {breadcrumbs.map((breadcrumb) => {
              return (
                <BreadcrumbItem
                  key={breadcrumb.text}
                  isCurrentPage={breadcrumb.isCurrentPage || false}
                >
                  {breadcrumb.isCurrentPage ? (
                    <BreadcrumbLink href={breadcrumb.href}>
                      {breadcrumb.text}
                    </BreadcrumbLink>
                  ) : (
                    <NextLink href={breadcrumb.href}>
                      <Link>{breadcrumb.text}</Link>
                    </NextLink>
                  )}
                </BreadcrumbItem>
              );
            })}
          </Breadcrumb>
          {children}
        </Box>
      </Box>
    </VStack>
  );
};
