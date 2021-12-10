import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Skeleton,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { useUser } from "../utils/useUser";
import { SidebarMenu } from "./SidebarMenu";
import { SidebarMenuLevel } from "./SidebarMenuLevel";

export type MenuType = {
  link: string;
  text: string;
  color: string;
  icon: IconType;
  roles?: string[];
  children?: MenuType[];
};

type SidebarProps = {
  menuIsOpen: boolean;
  setMenuIsOpen: () => void;
  setMenuIsClose: () => void;
  menus: MenuType[];
};

export const Sidebar: React.FC<SidebarProps> = ({
  menuIsOpen,
  setMenuIsClose,
  menus = [],
}) => {
  const { user, isLoading, isError } = useUser();

  return (
    <Drawer isOpen={menuIsOpen} placement="left" onClose={setMenuIsClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>Menu</DrawerHeader>
        <DrawerBody p={0}>
          {menus.map((menu) => {
            if (isLoading) {
              return (
                <Skeleton key={menu.text}>
                  <SidebarMenu key={menu.text} {...menu} />
                </Skeleton>
              );
            }

            if (menu.roles) {
              if (menu.roles.indexOf(user.role) === -1) {
                return;
              }
            }

            return menu?.children ? (
              <SidebarMenuLevel
                key={menu.text}
                text={menu.text}
                color={menu.color}
                icon={menu.icon}
              >
                {menu.children.map((child) => {
                  <SidebarMenu key={child.text} {...child} />;
                })}
              </SidebarMenuLevel>
            ) : (
              <SidebarMenu key={menu.text} {...menu} />
            );
          })}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
