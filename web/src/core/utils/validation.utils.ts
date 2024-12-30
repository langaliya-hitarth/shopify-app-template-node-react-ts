export const isInvalid = (value: unknown): boolean => {
  // Check if the value is false, null, undefined, empty string, NaN, empty array, or empty object
  if (
    value === false ||
    value === null ||
    value === undefined ||
    value === '' ||
    Number.isNaN(value)
  ) {
    return true;
  }

  // Check if the value is an empty array
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }

  // Check if the value is an empty object
  if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) {
    return true;
  }

  return false; // Return false for all other valid values
};

const validationUtils = {
  isInvalid,
};

export default validationUtils;
