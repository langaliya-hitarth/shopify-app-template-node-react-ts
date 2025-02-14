/**
 * Validates a value and returns the value if valid, or the default empty value for that type if invalid.
 * @param value - The value to validate.
 * @returns The original value if valid, or the appropriate empty value for that type if invalid.
 */
export const isInvalid = <T>(value: T): T => {
  // Handle primitive types
  if (
    value === false ||
    value === null ||
    value === undefined ||
    value === '' ||
    (typeof value === 'number' && Number.isNaN(value))
  ) {
    return value;
  }

  // Handle arrays
  if (Array.isArray(value)) {
    return value.length === 0 ? value : value;
  }

  // Handle objects
  if (typeof value === 'object' && !Array.isArray(value)) {
    return Object.keys(value as object).length === 0 ? value : value;
  }

  // Return original value for all other cases
  return value;
};

const validationUtils = {
  isInvalid,
};

export default validationUtils;
