import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FaBars } from "react-icons/fa";
import { request } from "../utils/request";

type NavbarDashboardProps = {
  menuIsOpen: boolean;
  setMenuIsOpen: () => void;
  setMenuIsClose: () => void;
};

export const NavbarDashboard: React.FC<NavbarDashboardProps> = ({
  menuIsOpen,
  setMenuIsOpen,
  setMenuIsClose,
}) => {
  const router = useRouter();

  return (
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
            <NextLink href="/dashboard/profile">
              <Link>
                <MenuItem>Profile</MenuItem>
              </Link>
            </NextLink>
            <MenuItem
              onClick={() => {
                request
                  .sendRequest({
                    method: "POST",
                    url: process.env.NEXT_PUBLIC_API_URL + "/auth/logout",
                    data: {},
                  })
                  .then((response: AxiosResponse) => {
                    request.setAccessToken(response.data.accessToken);
                    router.replace("/login");
                  });
              }}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};
