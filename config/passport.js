const LocalStrategy = require("passport-local").Strategy;
const users = require("../config/userModel").userModel;
const bcrypt = require("bcrypt");

const initialize = function (passport) {
  const authUser = async (email, password, done) => {
    const user = await getUserByEMail(email);

    if (user == null) {
      return done(null, false, { msg: "User already exists" });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        console.log("right pass");
        console.log("user id is", user.id);

        done(null, user);
      } else {
        console.log("wrong pass");

        done(null, false, { msg: "User not found" });
      }
    } catch (e) {
      done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authUser));

  passport.serializeUser((user, done) => {
    // console.log("user id is", user.id);
    return done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    users.findById(id, function (err, user) {
      done(err, user);
    });
  });
};

const getUserByEMail = function (email) {
  return users.findOne({ email: email });
};
module.exports = { initialize };
