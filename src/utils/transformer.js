export const parseData = (data) => {
  if (!data) return {};
  if (typeof data === "object") return data;
  if (typeof data === "string") return JSON.parse(data);
  return {};
};

export const extractMiddleCharacter = (str) => {

  var position;
  var length;

  if(str.length % 2 === 1) {
      position = str.length / 2;
      length = 1;
  } else {
      position = str.length / 2 - 1;
      length = 2;
  }

  return str.substring(position, position + length).toUpperCase()
}
