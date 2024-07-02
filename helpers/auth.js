const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwt: jwtConfig } = require('config');

async function hashPassword(plainTextPass) {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(plainTextPass, salt);

  return hashedPass;
}

async function checkPassword(password, userPassword) {
  return await bcrypt.compare(password, userPassword);
}

function issueJwt(data) {
  return jwt.sign(data, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
}

function verifyJwt(token) {
  let data = {};

  if (!token) {
    return data;
  }

  try {
    data = jwt.verify(token, jwtConfig.secret);
  } catch (err) {
    console.log(err);
  }

  return data;
}

module.exports = {
  hashPassword,
  checkPassword,
  issueJwt,
  verifyJwt,
};
