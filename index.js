const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const users = [];

app.post("/api/users", (req, res) => {
  const { username } = req.body;
  console.log(username);
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }
  const id = users.length + 1;
  const newUser = { username, id };
  users.push(newUser);
  res.json(newUser);
});

app.post("/api/users/:_id/exercises", (req, res) => {
  const id = req.params._id;
  let { description, duration, date } = req.body;
  if (!description || !duration) {
    return res
      .status(400)
      .json({ error: "description and duration is required" });
  }
  if (!date) {
    date = new Date();
  }

  let userExercise = { description, duration, date };
  let user = users.find((user) => user.id == id);
  user.description = description;
  user.duration = duration;
  user.date = date;
  res.json(userExercise);
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:_id/exercises", (req, res) => {
  res.json(users);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
