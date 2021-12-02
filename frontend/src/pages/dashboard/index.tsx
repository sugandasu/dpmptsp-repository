import { Box, Heading } from "@chakra-ui/react";
import Card from "../../components/Card";
import { LayoutDashboard } from "../../components/LayoutDashboard";

const DashboardIndex = () => {
  return (
    <LayoutDashboard title="Dashboard">
      <Card title="Dashboard"></Card>
    </LayoutDashboard>
  );
};

export default DashboardIndex;
