import { Alert, AlertIcon, Box, CloseButton } from "@chakra-ui/react";

type AlertAllProps = {
  status: "success" | "info" | "warning" | "error";
  message: string;
  onClose: (value: string) => void;
};

export const AlertAll: React.FC<AlertAllProps> = ({
  status = "error",
  message,
  onClose,
}) => {
  return (
    <Box my={5}>
      <Alert status={status}>
        <AlertIcon />
        {message}
        <CloseButton
          position="absolute"
          right="8px"
          top="8px"
          onClick={() => onClose("")}
        />
      </Alert>
    </Box>
  );
};
