import { Box, Button, Textarea, useToast } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { FaEnvelope, FaUser } from "react-icons/fa";
import { Card } from "../../components/Card";
import { FieldInput } from "../../components/FieldInput";
import { FieldPassword } from "../../components/FieldPassword";
import { LayoutDashboard } from "../../components/LayoutDashboard";
import { LoadingFull } from "../../components/LoadingFull";
import isAuth from "../../middlewares/isAuth";
import { request } from "../../utils/request";

const DashboardProfile = () => {
  isAuth();

  const toast = useToast({
    title: "Akun Profil",
    position: "top-right",
    isClosable: true,
  });

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [apiToken, setApiToken] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      await request
        .sendRequest({
          method: "GET",
          url: process.env.NEXT_PUBLIC_API_URL + "/profile",
          data: {},
        })
        .then((response: AxiosResponse) => {
          setUsername(response.data.user.username);
          setEmail(response.data.user.email);
          setApiToken(response.data.user.apiToken);
        })
        .catch((err) => {
          console.log(err);
        });

      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <LoadingFull />;
  }

  return (
    <LayoutDashboard
      title="Profile"
      breadcrumbs={[
        { text: "Dashboard", href: "/dashboard" },
        { text: "Profile", href: "/dashboard/profile", isCurrentPage: true },
      ]}
    >
      <Card title="Profile">
        <Box>
          <Formik
            initialValues={{
              username,
              email,
              old_password: "",
              new_password: "",
            }}
            onSubmit={(values, { setErrors, setSubmitting }) => {
              request
                .sendRequest({
                  method: "PUT",
                  url: process.env.NEXT_PUBLIC_API_URL + "/profile",
                  data: values,
                })
                .then((response: AxiosResponse) => {
                  toast({
                    status: "success",
                    description: response.data.message,
                  });
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
            {({ isSubmitting }) => (
              <Form>
                <FieldInput
                  label="Username"
                  name="username"
                  required={true}
                  LeftIcon={FaUser}
                />
                <FieldInput
                  label="Email"
                  name="email"
                  type="email"
                  LeftIcon={FaEnvelope}
                />
                <FieldPassword label="Password Lama" name="old_password" />
                <FieldPassword label="Password Baru" name="new_password" />
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
      <Card title="API">
        <Box>
          <Textarea defaultValue={apiToken} disabled></Textarea>
        </Box>
      </Card>
    </LayoutDashboard>
  );
};

export default DashboardProfile;
