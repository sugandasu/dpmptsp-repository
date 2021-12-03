import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Column, useTable } from "react-table";
import Card from "../../../components/Card";
import { LayoutDashboard } from "../../../components/LayoutDashboard";
import TableClient from "../../../components/TableClient";

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
        Header: "#",
        accessor: "id",
      },
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <LayoutDashboard title="Izin">
      <Card title="Data Izin">
        <TableClient
          columns={columns}
          data={data}
          tableCaption="Izin yang ada di DPMPTSP Sulawesi Tengah"
        ></TableClient>
      </Card>
    </LayoutDashboard>
  );
};

export default DashboardIzin;
