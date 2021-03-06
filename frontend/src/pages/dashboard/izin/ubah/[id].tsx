import { Box, Button, Flex, Link, Spinner, useToast } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaAsterisk, FaBuilding, FaCalendar, FaUser } from "react-icons/fa";
import { Card } from "../../../../components/Card";
import { FieldInput } from "../../../../components/FieldInput";
import { FieldRadio } from "../../../../components/FieldRadio";
import { LayoutDashboard } from "../../../../components/LayoutDashboard";
import isDpmptspOperator from "../../../../middlewares/isDpmptspOperator";
import { request } from "../../../../utils/request";

const IzinEdit = () => {
  isDpmptspOperator();

  const router = useRouter();
  const [izin, setIzin] = useState({
    number: "",
    type: "Perorangan",
    name: "",
    effective_date: "",
  });

  useEffect(() => {
    if (router.query.id === undefined) {
      return;
    }

    const fetchIzin = async () => {
      request
        .sendRequest({
          method: "GET",
          url: process.env.NEXT_PUBLIC_API_URL + `/izins/${router.query.id}`,
          data: {},
        })
        .then((response: AxiosResponse) => {
          setIzin(response.data.izin);
        })
        .catch((error) => {
          if (error.response.data.message) {
            toast({
              status: "error",
              description: error.response.data.message,
            });
          }
          console.log(error);
          router.push("/dashboard/izin");
        });
    };
    fetchIzin();
  }, [router.query.id]);

  const toast = useToast({
    title: "Ubah Izin",
    position: "top-right",
    isClosable: true,
  });

  return (
    <LayoutDashboard
      title="Ubah Izin"
      breadcrumbs={[
        { text: "Dashboard", href: "/dashboard" },
        { text: "Izin", href: "/dashboard/izin" },
        {
          text: "Ubah Izin",
          href: "/dashboard/izin/ubah",
          isCurrentPage: true,
        },
      ]}
    >
      <Card
        title="Form Ubah Izin"
        aksi={
          <NextLink href="/dashboard/izin">
            <Link>
              <Button bg="red.500" color="white">
                Batal
              </Button>
            </Link>
          </NextLink>
        }
      >
        {izin.number === "" ? (
          <Flex justify="center">
            <Spinner
              thickness="4px"
              speed="0.8s"
              emptyColor="gray.200"
              color="blue.500"
              size="lg"
            />
          </Flex>
        ) : (
          <Box>
            <Formik
              initialValues={{ ...izin }}
              onSubmit={(values, { setErrors, setSubmitting }) => {
                request
                  .sendRequest({
                    method: "PUT",
                    url:
                      process.env.NEXT_PUBLIC_API_URL +
                      `/izins/${router.query.id}`,
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
        )}
      </Card>
    </LayoutDashboard>
  );
};

export default IzinEdit;
