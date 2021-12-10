import {
  Box,
  Button,
  Flex,
  Link,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card } from "../../../../components/Card";
import { LayoutDashboard } from "../../../../components/LayoutDashboard";
import isDpmptspOperator from "../../../../middlewares/isDpmptspOperator";
import { request } from "../../../../utils/request";

const IzinDelete = () => {
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
    title: "Hapus Izin",
    position: "top-right",
    isClosable: true,
  });

  return (
    <LayoutDashboard
      title="Hapus Izin"
      breadcrumbs={[
        { text: "Dashboard", href: "/dashboard" },
        { text: "Izin", href: "/dashboard/izin" },
        {
          text: "Hapus Izin",
          href: "/dashboard/izin/hapus",
          isCurrentPage: true,
        },
      ]}
    >
      <Card
        title="Konfirmasi Hapus Izin"
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
              color="green.500"
              size="lg"
            />
          </Flex>
        ) : (
          <Box>
            <Formik
              initialValues={{ ...izin }}
              onSubmit={(_, { setErrors, setSubmitting }) => {
                request
                  .sendRequest({
                    method: "DELETE",
                    url:
                      process.env.NEXT_PUBLIC_API_URL +
                      `/izins/${router.query.id}`,
                    data: {},
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
              {({ isSubmitting, values }) => (
                <Form>
                  <Text my={5}>
                    Apakah anda yakin ingin menghapus data izin dengan nomor{" "}
                    {values.number}
                  </Text>
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    width="100%"
                    colorScheme="red"
                  >
                    Hapus
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

export default IzinDelete;
