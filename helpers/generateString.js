module.exports.generateRandomSring = (length) => {
  const char = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz0123456789";
  let result = "";
  for (i = 0; i < length; i++) {
    result += char.charAt(Math.floor(Math.random() * char.length));
  }
  return result;
};
