import { Box, Button, Flex, Heading, VStack } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { AlertAll } from "../components/AlertAll";
import { FieldInput } from "../components/FieldInput";
import { FieldPassword } from "../components/FieldPassword";
import { request } from "../utils/request";

const Login = () => {
  const [errorAll, setErrorAll] = useState("");
  const router = useRouter();
  return (
    <Flex height="100vh" width="100%" align="center" justify="center">
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
                  setErrors(err.response.data.errors);
                  if (err.response.data.errors?.message) {
                    setErrorAll(err.response.data.message);
                  }
                })
                .finally(() => {
                  setSubmitting(false);
                });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                {errorAll !== "" ? (
                  <AlertAll
                    status="error"
                    message={errorAll}
                    onClose={setErrorAll}
                  />
                ) : null}
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
    </Flex>
  );
};

export default Login;
