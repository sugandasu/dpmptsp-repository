import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";
import { IconType } from "react-icons";

type FieldInputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  LeftIcon?: IconType;
};

export const FieldInput: React.FC<FieldInputProps> = ({
  label,
  size: _,
  LeftIcon,
  ...props
}) => {
  const [field, { error, touched }] = useField(props);

  return (
    <FormControl isRequired={props.required} isInvalid={!!error} my={5}>
      <FormLabel htmlFor={field.name} mb={2}>
        {label}
      </FormLabel>
      <InputGroup>
        {LeftIcon ? (
          <InputLeftElement color="gray.300" children={<LeftIcon />} />
        ) : null}
        <Input {...field} {...props} id={field.name} borderWidth={2} />
      </InputGroup>
      {touched && error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
