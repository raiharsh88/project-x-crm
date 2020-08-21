const users = require("express").Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const { userModel } = require("../config/userModel");

users.post("/register", async (req, res) => {
  let user = req.body;

  let { name, email, password, phone } = user;

  password = await bcrypt.hash(password, 10);

  await userModel.findOne(
    { email: user.email },
    "email",
    async (err, person) => {
      if (person) {
        // console.log(person);
        res.json({ msg: "User already exists!" });
      } else {
        // console.log(err, person);

        const newUser = new userModel({
          name,
          phone,
          email,
          password,
        });

        await newUser.save();
        req.session.cookie;
        res.json({
          msg: "Successfully registered!",
          url: "/login",
          status: 200,
        });
      }
    }
  );
});

users.post("/login", (req, res, next) => {
  const user = req.body;
  passport.authenticate("local", (err, user, info) => {
    if (user) {
      req.logIn(user, function (err) {
        if (err) {
          res.json({ msg: "Something went wrong", url: "/login" });
        }
        return res.json({ msg: "authorized", url: "/home" });
      });
    } else if (!user) {
      return res.json({ msg: "unauthorized", url: "/login" });
    }

    if (err) res.json({ msg: "Something went wrong", url: "/login" });
  })(req, res, next);
});

users.post("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

users.post("/test", (req, res) => {
  res.json({ test: "this is a test" });
});
module.exports = users;
