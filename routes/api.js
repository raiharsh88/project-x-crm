const apiRouter = require("express").Router();
const { reminderModel } = require("../config/userModel");

apiRouter.post("/save", async (req, res) => {
  let user = req.user;
  if (!user) return res.json({ err: "UNAUTHORIZED", status: 401 });
  else {
  }
  var prevReminders = await reminderModel.findOne({ user: req.user.id });

  var newReminder = req.body;
  let newRemId = null;

  if (newReminder.id != null) {
    console.log("looking for this reminder ...");
  } else {
    newRemId = user.id + "#ts" + Date.now();
  }

  //   newReminder["remId"] = "5f3c2ccdb43eed0fe78a0696#ts1597931709095";

  if (prevReminders) {
    let reminderQue = 0;
    let oldRem = await prevReminders.reminders.find((r) => {
      reminderQue++;
      return r.remId === newReminder.remId;
    });

    if (oldRem == undefined) {
      console.log("No old record found ");

      newReminder["remId"] = newRemId;
      prevReminders.reminders.push(newReminder);

      let updateReminder = new reminderModel(prevReminders);

      await updateReminder.save(function (err, doc) {
        if (err) return res.json({ err: "something went wrong (first)" });

        console.log("adding a new reminder in the list");
      });
    } else if (oldRem) {
      prevReminders.reminders[reminderQue - 1] = newReminder;

      let updateReminder = new reminderModel(prevReminders);

      updateReminder.save((err, doc) => {
        if (err) return res.json({ err: "server internal error", status: 500 });
        console.log("Updated old reminder");

        res.json({ status: 200, msg: "Successfully update reminder" });
      });
    }
  } else {
    console.log("Creating a new reminder list");
    newReminder["remId"] = newRemId;
    let updateReminder = new reminderModel({
      user: user.id,
      reminders: [newReminder],
    });

    await updateReminder.save((err, doc) => {
      if (err) return res.json({ err: "something went wrong (new)" });
      else res.json({ msg: "saved successfully" });
    });
  }

  //   const newReminder = new reminderModel({});
});

apiRouter.post("/open1", async (req, res) => {
  const remId = req.body.remId;
  const user = req.user.id;

  if (!user) return res.json({ err: "UNAUTHORIZED", status: 401 });

  let prevReminders = await reminderModel.findOne({ user });

  if (!prevReminders)
    return res.json({ err: "resource not found", status: 404 });

  let reminder = await prevReminders.reminders.find((r) => r.remId === remId);

  if (!reminder) return res.json({ err: "resource not found", status: 404 });

  console.log("Fetched one reminder");

  res.json({ status: 200, reminder });
});

apiRouter.post("/openall", async (req, res) => {
  const remId = req.body.remId;
  const user = req.user.id;

  if (!user) return res.json({ err: "UNAUTHORIZED", status: 401 });

  let reminders = await reminderModel.findOne({ user });

  if (!reminders) return res.json({ msg: "you have no reminders", status: 1 });

  reminders = reminders.reminders;

  console.log("fetched all");
  res.json({ status: 200, reminders });
});

apiRouter.post("/delete", (req, res) => {
  let user = req.user;
  if (!user) return res.json({ err: "UNAUTHORIZED", status: 401 });
});
module.exports = apiRouter;
