export const alphaTrim = (string) => {
  return string
    ?.replace(/[\W_]+/g, "")
    .replace(/ /g, "")
    .toLowerCase()
    .trim();
};
