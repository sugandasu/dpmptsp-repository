export const enumToArray = (enum_: Object): any[] => {
  const values = Object.values(enum_);
  return values.splice(values.length / 2 - 1);
};
