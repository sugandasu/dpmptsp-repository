import { Box, Heading } from "@chakra-ui/react";
import { Card } from "../../components/Card";
import { LayoutDashboard } from "../../components/LayoutDashboard";
import isAuth from "../../middlewares/isAuth";

const DashboardIndex = () => {
  isAuth();
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
