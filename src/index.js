var express = require("express");
var exphbs = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const users = require("../routes/users");
const apiRouter = require("../routes/api");
const mongoose = require("mongoose");
const { mongoURI } = require("../config/keys");
const mongoStore = require("connect-mongo")(session);
const passport = require("passport");
const flash = require("express-flash");
const initializePassport = require("../config/passport").initialize;

const port = process.env.PORT || 3000;

const path_to_static = express.static(path.join(__dirname, "../public"));
const dbOption = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose
  .connect(mongoURI, dbOption)
  .then(() => {
    console.log("successfully connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

const connection = mongoose.connection;

const sessionStore = new mongoStore({
  mongooseConnection: connection,
  collection: "sessions",
});
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(flash());
app.use(bodyParser.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    secret: "passcode@95",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: true,
      secure: false,
    },
  })
);

initializePassport(passport);

app.use(passport.initialize());
app.use(passport.session());
app.use(path_to_static);
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.use("/api", apiRouter); // Router for API
app.use("/users", users); //Router for users

//Routes

app.get("/register", (req, res) => {
  res.render("register", {
    text: "hello world",
  });
});

app.get("/login", (req, res) => {
  res.render("login", {
    text: "hello world",
  });
});

app.get("/home", checkAuthenticated, (req, res) => {
  res.render("dashboard");
});

app.get("/product", (req, res) => {
  res.render("product", {
    text: "hello world",
  });
});

// Routes
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
