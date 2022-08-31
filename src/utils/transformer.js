export const parseData = (data) => {
  if (!data) return {};
  if (typeof data === "object") return data;
  if (typeof data === "string") return JSON.parse(data);
  return {};
};
