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
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import NextLink from "next/link";

type LayoutDashboardProps = {
  title: string;
  breadcrumbs?: { text: string; href: string; isCurrentPage?: boolean }[];
};

export const LayoutDashboard: React.FC<LayoutDashboardProps> = ({
  children,
  title,
  breadcrumbs = [],
}) => {
  return (
    <Box minH="100vh" bgColor="gray.50">
      <Flex
        h="70px"
        elevation={2}
        shadow="md"
        align="center"
        px={5}
        justify="center"
        bgColor="white"
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
      <Box maxWidth="8xl" px={5} py={5} width="100%">
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
  );
};
