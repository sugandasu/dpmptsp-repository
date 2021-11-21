import joi from "joi";

export const formatJoiError = (result: joi.ValidationResult) => {
  const errorFormatted: Record<string, string> = {};
  result.error?.details.forEach(({ context, message }) => {
    console.log(message);
    if (context?.key) {
      errorFormatted[context.key] = message;
    }
  });

  return errorFormatted;
};
