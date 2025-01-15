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


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
