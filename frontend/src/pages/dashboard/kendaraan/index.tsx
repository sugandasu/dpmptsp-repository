import { Box, Button, useToast } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { FaAsterisk } from "react-icons/fa";
import { Card } from "../../../components/Card";
import { FieldInput } from "../../../components/FieldInput";
import { LayoutDashboard } from "../../../components/LayoutDashboard";
import isDpmptspOperator from "../../../middlewares/isDpmptspOperator";
import { request } from "../../../utils/request";

const Kendaraan = () => {
  isDpmptspOperator();

  const router = useRouter();
  const toast = useToast({
    title: "Periksa Pajak Kendaraan",
    position: "top-right",
    isClosable: true,
  });

  return (
    <LayoutDashboard
      title="Periksa Pajak KendaraanIzin"
      breadcrumbs={[
        { text: "Dashboard", href: "/dashboard" },
        {
          text: "Periksa Pajak Kendaraan",
          href: "/dashboard/periksa-pajak-kendaraan",
          isCurrentPage: true,
        },
      ]}
    >
      <Card title="Periksa Pajak Kendaraan">
        <Box>
          <Formik
            initialValues={{
              framenumber: "",
            }}
            onSubmit={(values, { setErrors, setSubmitting }) => {
              request
                .sendRequest({
                  method: "POST",
                  url:
                    process.env.NEXT_PUBLIC_API_URL +
                    "/kendaraans/periksa-pajak",
                  data: values,
                })
                .then((response: AxiosResponse) => {
                  toast({
                    status: "success",
                    description: response.data.message,
                  });
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
            {({ isSubmitting }) => (
              <Form>
                <FieldInput
                  label="Nomor Rangka Kendaraan"
                  name="framenumber"
                  required={true}
                  LeftIcon={FaAsterisk}
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

export default Kendaraan;
