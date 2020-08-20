const apiRouter = require("express").Router();

apiRouter.post("/save", (req, res) => {
  console.log("req", req.body);
  console.log("User is", req.user);

  res.json("hello world");
});
module.exports = apiRouter;
