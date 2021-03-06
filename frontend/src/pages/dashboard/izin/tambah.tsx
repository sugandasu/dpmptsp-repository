import { Box, Button, Link, useToast } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FaAsterisk, FaBuilding, FaCalendar, FaUser } from "react-icons/fa";
import { Card } from "../../../components/Card";
import { FieldInput } from "../../../components/FieldInput";
import { FieldRadio } from "../../../components/FieldRadio";
import { LayoutDashboard } from "../../../components/LayoutDashboard";
import isDpmptspOperator from "../../../middlewares/isDpmptspOperator";
import { request } from "../../../utils/request";

const IzinCreate = () => {
  isDpmptspOperator();

  const router = useRouter();
  const toast = useToast({
    title: "Tambah Izin",
    position: "top-right",
    isClosable: true,
  });

  return (
    <LayoutDashboard
      title="Tambah Izin"
      breadcrumbs={[
        { text: "Dashboard", href: "/dashboard" },
        { text: "Izin", href: "/dashboard/izin" },
        {
          text: "Tambah Izin",
          href: "/dashboard/izin/tambah",
          isCurrentPage: true,
        },
      ]}
    >
      <Card
        title="Form Tambah Izin"
        aksi={
          <NextLink href="/dashboard/izin">
            <Link>
              <Button bg="red.500" color="white">
                Kembali
              </Button>
            </Link>
          </NextLink>
        }
      >
        <Box>
          <Formik
            initialValues={{
              number: "",
              type: "Perorangan",
              name: "",
              effective_date: "",
            }}
            onSubmit={(values, { setErrors, setSubmitting }) => {
              request
                .sendRequest({
                  method: "POST",
                  url: process.env.NEXT_PUBLIC_API_URL + "/izins",
                  data: values,
                })
                .then((response: AxiosResponse) => {
                  toast({
                    status: "success",
                    description: response.data.message,
                  });
                  router.push("/dashboard/izin");
                })
                .catch((error) => {
                  if (error.response.data.errors) {
                    setErrors(error.response.data.errors);
                  }
                  console.log(error);
                })
                .finally(() => {
                  setSubmitting(false);
                });
            }}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form>
                <FieldInput
                  label="Nomor Izin"
                  name="number"
                  required={true}
                  LeftIcon={FaAsterisk}
                />
                <FieldRadio
                  name="type"
                  label="Jenis Izin"
                  required={true}
                  options={["Perorangan", "Perusahaan"]}
                  setFieldValue={setFieldValue}
                />
                {values.type === "Perusahaan" ? (
                  <FieldInput
                    label="Nama Perusahaan"
                    name="name"
                    required={true}
                    LeftIcon={FaBuilding}
                  />
                ) : (
                  <FieldInput
                    label="Nama"
                    name="name"
                    required={true}
                    LeftIcon={FaUser}
                  />
                )}
                <FieldInput
                  type="date"
                  label="Tanggal Mulai Berlaku"
                  name="effective_date"
                  required={true}
                  LeftIcon={FaCalendar}
                />
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  width="100%"
                  colorScheme="blue"
                >
                  Simpan
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Card>
    </LayoutDashboard>
  );
};

export default IzinCreate;
