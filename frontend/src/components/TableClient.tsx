import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Spacer,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaEllipsisH,
  FaFilter,
} from "react-icons/fa";
import { Column, useFilters, useGlobalFilter, useTable } from "react-table";

type TableClientProps = {
  columns: Column<any>[];
  data: any[];
  tableCaption: string;
};

type ReactTableProps = {
  columns: Column<any>[];
  data: any[];
  tableCaption: string;
};

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  const [value, setValue] = useState(globalFilter);

  return (
    <Input
      value={value || ""}
      onChange={(e) => {
        setValue(e.target.value);
        setGlobalFilter(e.target.value);
      }}
    ></Input>
  );
};

const TableClient: React.FC<TableClientProps> = ({
  columns,
  data,
  tableCaption,
}) => {
  const ReactTable: React.FC<ReactTableProps> = ({
    columns,
    data,
    tableCaption,
  }) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      state,
      setGlobalFilter,
      prepareRow,
    } = useTable({ columns, data }, useFilters, useGlobalFilter);

    return (
      <Box my={5}>
        <Flex align="center" mb={5}>
          <Text size="sm">Halaman 1 dari 2</Text>
          <Spacer></Spacer>
          <HStack spacing={1}>
            <Box>
              <Popover size="xs">
                <PopoverTrigger>
                  <IconButton
                    aria-label="cari"
                    size="sm"
                    offset
                    padding={0}
                    preventOverflow
                    icon={<FaFilter />}
                  ></IconButton>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Cari</PopoverHeader>
                  <PopoverBody>
                    <GlobalFilter
                      globalFilter={state.globalFilter}
                      setGlobalFilter={setGlobalFilter}
                    />
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
            <Select size="sm" rounded="md">
              <option value="5">5</option>
            </Select>
          </HStack>
        </Flex>
        <Flex overflow="scroll" mb={5}>
          <Table {...getTableProps}>
            <TableCaption>{tableCaption}</TableCaption>
            <Thead>
              {headerGroups.map((headerGroup) => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <Th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Flex>
        <Flex align="center">
          <Text fontSize="sm">10 data dari 15</Text>
          <Spacer></Spacer>
          <HStack spacing={1}>
            <IconButton
              aria-label="sebelum"
              size="sm"
              icon={<FaAngleLeft />}
            ></IconButton>
            <Box>
              <Popover>
                <PopoverTrigger>
                  <IconButton
                    aria-label="ke halaman"
                    size="sm"
                    icon={<FaEllipsisH />}
                  ></IconButton>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Halaman Pilihan</PopoverHeader>
                  <PopoverBody>
                    <HStack spacing={1}>
                      <Input></Input>
                      <Button>Pilih</Button>
                    </HStack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
            <IconButton
              aria-label="lanjutan"
              size="sm"
              icon={<FaAngleRight />}
            ></IconButton>
          </HStack>
        </Flex>
      </Box>
    );
  };

  return (
    <ReactTable
      columns={columns}
      data={data}
      tableCaption={tableCaption}
    ></ReactTable>
  );
};

export default TableClient;
