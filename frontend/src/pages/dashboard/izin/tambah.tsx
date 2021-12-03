import { Box, Button, Heading, Link } from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useState } from "react";
import {
  FaAsterisk,
  FaBuilding,
  FaCalendar,
  FaFile,
  FaUser,
} from "react-icons/fa";
import { AlertAll } from "../../../components/AlertAll";
import Card from "../../../components/Card";
import { FieldInput } from "../../../components/FieldInput";
import { FieldRadio } from "../../../components/FieldRadio";
import { LayoutDashboard } from "../../../components/LayoutDashboard";
import NextLink from "next/link";

const IzinCreate = () => {
  const [errorAll, setErrorAll] = useState("");

  return (
    <LayoutDashboard title="Tambah Izin">
      <Card
        title="Form Tambah Izin"
        aksi={
          <NextLink href="/dashboard/izin">
            <Link>
              <Button bg="red.500" color="white">
                Kembali
              </Button>
            </Link>
          </NextLink>
        }
      >
        <Box>
          <Formik
            initialValues={{
              number: "",
              type: "Perusahaan",
              name: "",
              effective_date: "",
            }}
            onSubmit={(values, { setErrors, setSubmitting }) => {
              console.log(values);
              axios
                .post(process.env.NEXT_PUBLIC_API_URL + "/izins", values)
                .then((response) => {})
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
            {({ isSubmitting, values, setFieldValue }) => (
              <Form>
                {errorAll !== "" ? (
                  <AlertAll
                    status="error"
                    message={errorAll}
                    onClose={setErrorAll}
                  />
                ) : null}
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
      </Card>
    </LayoutDashboard>
  );
};

export default IzinCreate;
