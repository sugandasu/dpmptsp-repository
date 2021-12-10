import {
  Box,
  Button,
  Flex,
  Link,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card } from "../../../../components/Card";
import { LayoutDashboard } from "../../../../components/LayoutDashboard";
import isDpmptspOperator from "../../../../middlewares/isDpmptspOperator";

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
      await axios
        .get(process.env.NEXT_PUBLIC_API_URL + `/izins/${router.query.id}`)
        .then((response) => {
          setIzin(response.data.izin);
        })
        .catch((err) => {
          if (err.response.data.errors?.all) {
            toast({
              status: "error",
              description: err.response.data.errors.all,
            });
            router.push("/dashboard/izin");
          }
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
                axios
                  .delete(
                    process.env.NEXT_PUBLIC_API_URL +
                      `/izins/${router.query.id}`
                  )
                  .then((response) => {
                    toast({
                      status: "success",
                      description: response.data.message,
                    });
                    router.push("/dashboard/izin");
                  })
                  .catch((err) => {
                    if (err.response.data.errors?.all) {
                      toast({
                        status: "error",
                        description: err.response.data.errors.all,
                      });
                      return;
                    }
                    setErrors(err.response.data.errors);
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
