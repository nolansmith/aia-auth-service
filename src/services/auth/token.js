module.exports = utils => {
  let { jwt } = utils;

  const createUserLoginToken = data => {
    let token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1h" });
    return token;
  };

  const checkUserLoginToken = token => {
    try {
      let valid = jwt.verify(token, process.env.JWT_SECRET);
      if (valid) return { valid: true };
    } catch (ex) {
      return { valid: false, message: ex.message };
    }
  };

  return {checkUserLoginToken,createUserLoginToken}
};
