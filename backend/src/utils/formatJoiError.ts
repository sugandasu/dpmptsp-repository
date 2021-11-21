import joi from "joi";

export const formatJoiError = (result: joi.ValidationError) => {
  const errorFormatted: Record<string, string> = {};
  result.details.forEach(({ context, message }) => {
    if (context?.key) {
      errorFormatted[context.key] = message;
    }
  });

  return errorFormatted;
};
