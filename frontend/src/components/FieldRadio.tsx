import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useField } from "formik";

type FieldRadioProps = {
  name: string;
  label: string;
  required: boolean;
  options: string[];
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
};

export const FieldRadio: React.FC<FieldRadioProps> = ({
  label,
  options,
  setFieldValue,
  ...props
}) => {
  const [field, { error, touched }] = useField(props.name);
  return (
    <FormControl isRequired={props.required} isInvalid={!!error} my={5}>
      <FormLabel htmlFor={field.name} mb={2}>
        {label}
      </FormLabel>
      <InputGroup>
        <RadioGroup id={field.name} name={props.name} {...field}>
          <Stack direction="row">
            {options.map((option) => (
              <Flex key={option} align="center">
                <Radio {...field} value={option}></Radio>
                <Box
                  ml={2}
                  onClick={() => {
                    setFieldValue(field.name, option);
                  }}
                >
                  {option}
                </Box>
              </Flex>
            ))}
          </Stack>
        </RadioGroup>
      </InputGroup>
      {touched && error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
