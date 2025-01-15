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




const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
