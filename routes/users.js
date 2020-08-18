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
        res.json({ msg: "Successfully registered!", url: "/login" });
      }
    }
  );
});

users.post("/login", async (req, res, next) => {
  const user = req.body;
  passport.authenticate("local", (err, user, info) => {
    console.log(err, user, info);

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
    res.json({ msg: "Something went wrong", url: "/login" });
  })(req, res, next);
});

users.post("/test", (req, res) => {
  console.log("This is the user", req.session);
  console.log(req.user);

  res.json({ test: "this is a test" });
});
module.exports = users;
