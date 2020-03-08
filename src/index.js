var express = require("express");
var exphbs = require("express-handlebars");
const path = require("path");
const port = process.env.PORT || 3000;
var app = express();

const path_to_static = express.static(path.join(__dirname, "../public"));

app.use(path_to_static);
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");

app.get("/register", (req, res) => {
  res.render("register", {
    text: "hello world"
  });
});

app.get("/login", (req, res) => {
  res.render("login", {
    text: "hello world"
  });
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/product", (req, res) => {
  res.render("product", {
    text: "hello world"
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
