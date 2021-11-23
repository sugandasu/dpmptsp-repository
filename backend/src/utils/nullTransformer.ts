export const nullTransformer = {
  to: (value: any) => {
    if (value === "") {
      return null;
    }
    return value;
  },
  from: (value: any) => {
    if (value === null) {
      return "";
    }
    return value;
  },
};
