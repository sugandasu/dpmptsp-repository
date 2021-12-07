import { Box, Button, Flex, Heading, VStack } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { AlertAll } from "../components/AlertAll";
import { FieldInput } from "../components/FieldInput";
import { FieldPassword } from "../components/FieldPassword";
import { request } from "../request";

const Login = () => {
  const [errorAll, setErrorAll] = useState("");
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
                  request.setToken(response.data.accessToken);
                })
                .catch((err) => {
                  setErrors(err.response.data.errors);
                  if (err.response.data.errors?.all) {
                    setErrorAll(err.response.data.errors.all);
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
        <Button
          width="100%"
          onClick={() => {
            request
              .sendRequest({
                method: "POST",
                url: process.env.NEXT_PUBLIC_API_URL + "/auth/me",
                data: {},
              })
              .then((response) => {
                console.log(response);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Me
        </Button>
        <Button
          width="100%"
          onClick={() => {
            request
              .sendRequest({
                method: "POST",
                url: process.env.NEXT_PUBLIC_API_URL + "/auth/refresh_token",
                data: {},
              })
              .then((response) => {
                console.log(response);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Refresh Token
        </Button>
      </VStack>
    </Flex>
  );
};

export default Login;
