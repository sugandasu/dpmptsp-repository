import { Box, Button, Heading } from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { AlertAll } from "../components/AlertAll";
import { FieldInput } from "../components/FieldInput";
import { FieldPassword } from "../components/FieldPassword";

const Login = () => {
  const [errorAll, setErrorAll] = useState("");
  return (
    <Box>
      <Heading textAlign="center">Login</Heading>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          axios
            .post(process.env.NEXT_PUBLIC_API_URL + "/auth/login", values)
            .then((response) => {
              console.log(response);
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
            <FieldPassword label="Password" name="password" required={true} />
            <Button type="submit" isLoading={isSubmitting} width="100%">
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
