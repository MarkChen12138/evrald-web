export const isRequired = (value, valueName) => {
  if (value === null || value === "") {
    return `${valueName} is required.`;
  } else {
    return null;
  }
};
