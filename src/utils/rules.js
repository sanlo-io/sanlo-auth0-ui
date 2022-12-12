export const requiredRules = [
  {
    label: "At least 8 characters in length",
    validator: (s) => (s.length >= 8),
  },
];

export const optionalRules = [
  {
    label: "Contains a lower case letter (a-z)",
    validator: (s) => (/[a-z]/).test(s),
  },
  {
    label: "Contains an upper case letter (A-Z)",
    validator: (s) => (/[A-Z]/).test(s),
  },
  {
    label: "Contains a number (i.e. 0-9)",
    validator: (s) => (/[0-9]/).test(s),
  },
  {
    label: "Contains a special character (e.g. !@#$%^&*)",
    // eslint-disable-next-line
    validator: (s) => (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/).test(s),
  },
];
