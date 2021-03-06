import { Box, Button, Flex, Heading, VStack } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { FaUser } from "react-icons/fa";
import { FieldInput } from "../components/FieldInput";
import { FieldPassword } from "../components/FieldPassword";
import isGuest from "../middlewares/isGuest";
import { request } from "../utils/request";

const Login = () => {
  isGuest();

  const router = useRouter();
  return (
    <Flex
      minHeight="100vh"
      width="100%"
      align="center"
      justify="center"
      bgColor="gray.50"
    >
      <Head>
        <title>Login - DPMPTSP Sulawesi Tengah</title>
      </Head>
      <Box boxShadow="xl" p={10} bgColor="white">
        <VStack spacing={1}>
          <Heading fontSize="4xl" fontWeight="semibold" textAlign="center">
            Login
          </Heading>
          <Box maxWidth="8xl">
            <Formik
              initialValues={{ username: "", password: "" }}
              onSubmit={(values, { setErrors, setSubmitting }) => {
                request
                  .sendRequest({
                    method: "POST",
                    url: process.env.NEXT_PUBLIC_API_URL + "/auth/login",
                    data: values,
                  })
                  .then((response: AxiosResponse) => {
                    request.setAccessToken(response.data.accessToken);
                    if (router.query.next) {
                      router.push(router.query.next as string);
                    } else {
                      router.push("/dashboard");
                    }
                  })
                  .catch((err) => {
                    if (err.response.data && err.response.data.errors) {
                      setErrors(err.response.data.errors);
                    }
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
                  <FieldPassword
                    label="Password"
                    name="password"
                    required={true}
                  />
                  <Button
                    type="submit"
                    colorScheme="blue"
                    isLoading={isSubmitting}
                    width="100%"
                  >
                    Login
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Login;
