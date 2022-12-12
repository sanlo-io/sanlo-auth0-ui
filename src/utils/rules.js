export const rules = [
  {
    message: "At least %d characters in length",
    format: [8],
    code: "lengthAtLeast",
  }, {
    message: "Contain at least %d of the following %d types of characters:",
    code: "containsAtLeast",
    format: [3, 4],
    items: [{
      message: "lower case letters (a-z)",
      code: "lowerCase",
    }, {
      message: "upper case letters (A-Z)",
      code: "upperCase",
    }, {
      message: "numbers (i.e. 0-9)",
      code: "numbers",
    }, {
      message: "special characters (e.g. !@#$%^&*)",
      code: "specialCharacters",
    }],
  },
];
