import { Box, Heading } from "@chakra-ui/react";
import { Card } from "../../components/Card";
import { LayoutDashboard } from "../../components/LayoutDashboard";

const DashboardIndex = () => {
  return (
    <LayoutDashboard
      title="Dashboard"
      breadcrumbs={[
        { text: "Dashboard", href: "/dashboard", isCurrentPage: true },
      ]}
    >
      <Card title="Dashboard"></Card>
    </LayoutDashboard>
  );
};

export default DashboardIndex;
