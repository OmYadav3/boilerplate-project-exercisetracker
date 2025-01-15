const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


const users = [];
app.post("/api/users", (req, res) => {
  //TODO: create the user object
  const { username } = req.body;
  if (!username) {
    return res
     .status(400)
     .json({ error: "username are required" });
  }
  const newUser = { id: Date.now().toString(), username, exercises: [] };
  users.push(newUser);
  res.json(newUser);

});

//2. You can POST to /api/users with form data username to create a new user

app.put("/api/users/:id", (req, res) => {
  //TODO: update the user object
  const { id } = req.params;
  const { username } = req.body;
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  if (!username) {
    return res
     .status(400)
     .json({ error: "username are required" });
  }
  user.username = username;
  res.json(user);
});


//3. The returned response from POST /api/users with form data username will be an object with username and _id properties

app.get("/api/users", (req, res) => {
  //TODO: get all users
  res.json(users);
});

//4. You can make a GET request to /api/users to get a list of all users

app.get("/api/users/:id", (req, res) => {
  //TODO: get a single user by id
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

//5. The GET request to /api/users returns an array.

app.post("/api/users/:id/exercises", (req, res) => {
  //TODO: add exercise to a user by id
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const { description, duration, date } = req.body;
  if (!description ||!duration ||!date) {
    return res
     .status(400)
     .json({ error: "description, duration, and date are required" });
  }
  user.exercises.push({ description, duration, date });
  res.json(user);
});

//6. Each element in the array returned from GET /api/users is an object literal containing a user's username and _id

app.delete("/api/users/:id", (req, res) => {
  //TODO: delete a user by id
  const { id } = req.params;
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  users.splice(index, 1);
  res.json({ message: "User deleted successfully" });
});

//7. You can POST to /api/users/:_id/exercises with form data description, duration, and optionally date. If no date is supplied, the current date will be used
        






const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
