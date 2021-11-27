import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useBoolean,
} from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";
import { IconType } from "react-icons";
import { FaEye, FaLock } from "react-icons/fa";

type FieldPasswordProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

export const FieldPassword: React.FC<FieldPasswordProps> = ({
  label,
  size: _,
  ...props
}) => {
  const [showPassword, setShowPassword] = useBoolean();
  const [field, { error, touched }] = useField(props);

  return (
    <FormControl isInvalid={!!error} my={5}>
      <FormLabel htmlFor={field.name} mb={2}>
        {label}
        {props.required ? <sup> *</sup> : null}
      </FormLabel>
      <InputGroup>
        <InputLeftElement color="gray.300" children={<FaLock />} />
        <Input
          {...field}
          {...props}
          id={field.name}
          borderWidth={2}
          type={showPassword ? "password" : "text"}
        />
        <InputRightElement
          color={showPassword ? "gray.500" : "black"}
          children={
            <IconButton
              aria-label="show password"
              onClick={setShowPassword.toggle}
              icon={<FaEye />}
            />
          }
        />
      </InputGroup>
      {touched && error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
