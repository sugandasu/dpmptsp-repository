import { FaHome, FaListAlt } from "react-icons/fa";
import { MenuType } from "./Sidebar";

export const menus: MenuType[] = [
  {
    link: "/dashboard",
    text: "Dashboard",
    color: "blue.500",
    icon: FaHome,
  },
  {
    link: "/dashboard/izin",
    text: "Izin",
    color: "red.500",
    icon: FaListAlt,
  },
];
