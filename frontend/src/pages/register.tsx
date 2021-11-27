import { Box, Button, Heading } from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { FaEnvelope, FaUser } from "react-icons/fa";
import { FieldInput } from "../components/FieldInput";
import { FieldPassword } from "../components/FieldPassword";

const Register = () => {
  return (
    <Box>
      <Heading textAlign="center">Register</Heading>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          axios
            .post(process.env.NEXT_PUBLIC_API_URL + "/auth/register", values)
            .then((response) => {
              console.log(response);
            })
            .catch((err) => {
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
              required={true}
              LeftIcon={FaEnvelope}
            />
            <FieldPassword label="Password" name="password" required={true} />
            <Button type="submit" isLoading={isSubmitting} width="100%">
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
