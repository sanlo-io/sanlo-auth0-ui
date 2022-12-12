export const requiredRules = [
  {
    label: "At least 8 characters in length",
    validator: (s) => (s.length >= 8),
  },
];

export const optionalRules = [
  {
    label: "Lowercase letter (a-z)",
    validator: (s) => (/[a-z]/).test(s),
  },
  {
    label: "Uppercase letter (A-Z)",
    validator: (s) => (/[A-Z]/).test(s),
  },
  {
    label: "Number (i.e. 0-9)",
    validator: (s) => (/[0-9]/).test(s),
  },
  {
    label: "Special character (e.g. !@#$%^&*)",
    // eslint-disable-next-line
    validator: (s) => (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/).test(s),
  },
];
