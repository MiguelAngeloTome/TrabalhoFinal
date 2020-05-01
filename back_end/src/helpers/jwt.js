const jwt = require("jsonwebtoken");
const key = "kfjkjURWojajjvclsC3pUUo8gb6A3omh";

exports.createToken = (payload) => {
  return new Promise((resolve, reject) => {
    const options = { expiresIn: "8h", issuer: "ti2Lessons" };
    jwt.sign(payload, key, options, (error, token) => {
      if (error) reject(error);
      else resolve({ token, ...payload });
    });
  });
};

exports.validateToken = (token) => {
  return new Promise((resolve, reject) => {
    let options = { issuer: "ti2Lessons" };
    jwt.verify(token, key, options, (error, payload) => {
      if (error) reject(error);
      else resolve(payload);
    });
  });
};