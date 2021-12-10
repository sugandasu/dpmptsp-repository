import { Button, HStack, IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useMemo } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import useSWR from "swr";
import { Card } from "../../../components/Card";
import { LayoutDashboard } from "../../../components/LayoutDashboard";
import { LoadingCard } from "../../../components/LoadingCard";
import { TableClient } from "../../../components/TableClient";
import isDpmptspOperator from "../../../middlewares/isDpmptspOperator";
import { request } from "../../../utils/request";

const DashboardIzin = () => {
  isDpmptspOperator();

  const { data, error } = useSWR(
    { method: "GET", url: process.env.NEXT_PUBLIC_API_URL + "/izins" },
    request.fetcher
  );

  const columns = useMemo<
    Column<{
      id: string;
      number: string;
      type: string;
      name: string;
      effectiveDate: string;
    }>[]
  >(
    () => [
      {
        Header: "Nomor Izin",
        accessor: "number",
      },
      {
        Header: "Jenis Izin",
        accessor: "type",
      },
      {
        Header: "Nama Instansi",
        accessor: "name",
      },
      {
        Header: "Tanggal Berlaku",
        accessor: "effectiveDate",
      },
      {
        Header: "Aksi",
        accessor: "id",
        Cell: (cellObj) => {
          return (
            <HStack spacing={1}>
              <NextLink href={`/dashboard/izin/ubah/${cellObj.row.values.id}`}>
                <Link>
                  <IconButton
                    aria-label="Ubah"
                    size="sm"
                    bgColor="transparent"
                    color="blue.500"
                    icon={<FaEdit />}
                  ></IconButton>
                </Link>
              </NextLink>
              <NextLink href={`/dashboard/izin/hapus/${cellObj.row.values.id}`}>
                <Link>
                  <IconButton
                    size="sm"
                    aria-label="Hapus"
                    bgColor="transparent"
                    color="red.500"
                    icon={<FaTrash />}
                  ></IconButton>
                </Link>
              </NextLink>
            </HStack>
          );
        },
        disableSortBy: true,
        disableGlobalFilter: true,
      },
    ],
    []
  );

  return (
    <LayoutDashboard
      title="Izin"
      breadcrumbs={[
        { text: "Dashboard", href: "/dashboard" },
        { text: "Izin", href: "/dashboard/izin", isCurrentPage: true },
      ]}
    >
      <Card
        title="Data Izin"
        aksi={
          <NextLink href="/dashboard/izin/tambah">
            <Link>
              <Button size="sm" colorScheme="blue">
                Tambah
              </Button>
            </Link>
          </NextLink>
        }
      >
        {data?.izins && !error ? (
          <TableClient
            columns={columns}
            data={data.izins}
            tableCaption="Izin yang ada di DPMPTSP Sulawesi Tengah"
            sortBy={[{ id: "number", desc: false }]}
          ></TableClient>
        ) : (
          <LoadingCard></LoadingCard>
        )}
      </Card>
    </LayoutDashboard>
  );
};

export default DashboardIzin;
