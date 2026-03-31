export const getTomorrow = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(0, 0, 0, 0);
  return date;
};

export const formatDate = (date) => {
  if (!date) return "";

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const replaceDynamicChars = (label, values = {}) => {
  let updated = label;

  Object.keys(values).forEach((key) => {
    if (values[key] !== "") {
      updated = updated.replaceAll(key, values[key]);
    }
  });

  return updated;
};

export const getSelectedOption = (options = [], selectedId) => {
  if (!selectedId) return null;
  return options.find((item) => item.id === selectedId) || null;
};

export const numbersOnly = (value = "") => value.replace(/\D/g, "");
