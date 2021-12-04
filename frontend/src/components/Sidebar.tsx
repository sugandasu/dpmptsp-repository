import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FaHome, FaListAlt } from "react-icons/fa";
import { SidebarMenu } from "./SidebarMenu";
import { SidebarMenuLevel } from "./SidebarMenuLevel";

export type MenuType = {
  link: string;
  text: string;
  color: string;
  icon: IconType;
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
  setMenuIsOpen,
  setMenuIsClose,
  menus = [],
}) => {
  return (
    <Drawer isOpen={menuIsOpen} placement="left" onClose={setMenuIsClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>Menu</DrawerHeader>
        <DrawerBody p={0}>
          {menus.map((menu) => {
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
