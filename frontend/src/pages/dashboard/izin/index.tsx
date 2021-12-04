import { Button, HStack, Link } from "@chakra-ui/react";
import axios from "axios";
import NextLink from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import { Card } from "../../../components/Card";
import { LayoutDashboard } from "../../../components/LayoutDashboard";
import { TableClient } from "../../../components/TableClient";

const DashboardIzin = () => {
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
                  <Button size="xs" colorScheme="blue" leftIcon={<FaEdit />}>
                    Ubah
                  </Button>
                </Link>
              </NextLink>

              <Button size="xs" colorScheme="red" leftIcon={<FaTrash />}>
                Hapus
              </Button>
            </HStack>
          );
        },
        disableSortBy: true,
        disableGlobalFilter: true,
      },
    ],
    []
  );

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/izins")
      .then((res) => {
        setData(res.data.izins);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        <TableClient
          columns={columns}
          data={data}
          tableCaption="Izin yang ada di DPMPTSP Sulawesi Tengah"
          sortBy={[{ id: "number", desc: false }]}
        ></TableClient>
      </Card>
    </LayoutDashboard>
  );
};

export default DashboardIzin;
