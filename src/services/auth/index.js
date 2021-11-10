const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



module.exports = (utils) => {
  let tools = { bcrypt, jwt, db: utils.db };
  let activity = require("./activity");
  let token = require("./token")(tools);
  let login = require("./login")(tools);

  return {
    ...activity,
    ...token,
    ...login
  };
};
