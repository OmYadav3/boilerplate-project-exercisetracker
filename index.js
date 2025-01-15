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


//2. You can POST to /api/users with form data username to create a new user

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

//3. The returned response from POST /api/users with form data username will be an object with username and _id properties

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


//4. You can make a GET request to /api/users to get a list of all users

app.get("/api/users", (req, res) => {
  //TODO: get all users
  res.json(users);
});

//5. The GET request to /api/users returns an array.
app.get("/api/users/:id", (req, res) => {
  //TODO: get a single user by id
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});


//6. Each element in the array returned from GET /api/users is an object literal containing a user's username and _id
//7. You can POST to /api/users/:_id/exercises with form data description, duration, and optionally date. If no date is supplied, the current date will be used
//8. The response returned from POST /api/users/:_id/exercises will be the user object with the exercise fields added.
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

 //9. You can make a GET request to /api/users/:_id/logs to retrieve a full exercise log of any user
 //10. A request to a user's log GET /api/users/:_id/logs returns a user object with a count property representing the number of exercises that belong to that user.
 //11. A GET request to /api/users/:_id/logs will return the user object with a log array of all the exercises added.
 //12. Each item in the log array that is returned from GET /api/users/:_id/logs is an object that should have a description, duration, and date properties.
 //13. The description property of any object in the log array that is returned from GET /api/users/:_id/logs should be a string.
 //14. The duration property of any object in the log array that is returned from GET /api/users/:_id/logs should be a number.
 //15. The date property of any object in the log array that is returned from GET /api/users/:_id/logs should be a string. Use the dateString format of the Date API.
 //16. You can add from, to and limit parameters to a GET /api/users/:_id/logs request to retrieve part of the log of any user. from and to are dates in yyyy-mm-dd format. limit is an integer of how many logs to send back.
 app.get("/api/users/:id/logs"), (req, res) => {
  //TODO: get user logs by id
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const { from, to, limit } = req.query;
  const filteredExercises = user.exercises.filter((exercise) => {
    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      return exercise.date >= fromDate && exercise.date <= toDate;
    }
    return true;
  })
  
  if (limit) {
    const limitNumber = parseInt(limit);
    filteredExercises.length = Math.min(filteredExercises.length, limitNumber);
  }
  const count = filteredExercises.length;
  res.json({ user, count, log: filteredExercises });

 }


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
