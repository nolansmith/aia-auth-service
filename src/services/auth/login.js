module.exports = tools => {
  let { bcrypt, db } = tools;
  let { user: User } = db.models;

  const findUser = async username => {
    let validUser = await User.findOne({ where: { username: username } });
    return validUser;
  };

  const verifyUserPassword = async ({ value, against }) => {
    let validPassword = await bcrypt.compare(value, against);
    if (!validPassword) return false;

    return true;
  };

  const tryToLogUserIn = async user => {
    try {
      let validUser = await findUser(user.username);
      if (!validUser) return { loginError: "Invalid Username" };
      let validPassword = await verifyUserPassword({
        value: user.password,
        against: validUser.password
      });
      if (!validPassword) return { loginError: "Invalid password" };
      return { user: { ...validUser.dataValues } };
    } catch (error) {
      console.log('[!] Error: ', error);
      return { loginError: 'Database Error' }
    }
  };

  return { findUser, verifyUserPassword, tryToLogUserIn };
};
