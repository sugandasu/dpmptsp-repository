import Icon from "@chakra-ui/icon";
import { Box, Flex } from "@chakra-ui/layout";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { IconType } from "react-icons";

interface SidebarMenuLevelProps {
  color: string;
  icon: IconType;
  text: string;
}

export const SidebarMenuLevel: React.FC<SidebarMenuLevelProps> = ({
  children,
  text,
  icon,
  color,
}) => {
  const router = useRouter();

  let routeIsHere = [];
  if (Array.isArray(children)) {
    routeIsHere = children.filter((child) => {
      if (typeof child === "object") {
        if ("props" in child) {
          if ("link" in child.props) {
            return router.route.includes(child.props.link);
          }
        }
      }
    });
  } else {
    if (typeof children === "object") {
      if ("props" in children) {
        if ("link" in children.props) {
          if (router.route.includes(children.props.link)) {
            routeIsHere.push(children.props.link);
          }
        }
      }
    }
  }

  return (
    <Box>
      <Accordion defaultIndex={routeIsHere.length > 0 ? [0] : null} allowToggle>
        <AccordionItem p={0} m={0} border={0}>
          <AccordionButton
            _hover={{ bgColor: "gray.200" }}
            color="gray.700"
            px={5}
            py={4}
          >
            <Flex width="100%" align="center">
              <Icon ml={2} mr="8px" color={color} as={icon} />
              {text}
            </Flex>
            <AccordionIcon mr={10} />
          </AccordionButton>
          <AccordionPanel p={0}>
            <Box bgColor="gray.100">{children}</Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};
