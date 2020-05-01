const crypto = require("crypto");
const key = "VpO0qDdiNgzXbSkjv9KR6Po8NvKPYkkS";

exports.generateIv = () => {
  return crypto.randomBytes(8).toString("hex");
};

exports.encrypt = (data, iv) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  return cipher.update(Buffer.from(data), "utf8", "hex") + cipher.final("hex");
};

exports.decrypt = (data, iv) => {
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  return decipher.update(data, "hex", "utf8") + decipher.final("utf8");
};