const express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");

const app = express();
var upload = multer();

// for parsing application/json
app.use(bodyParser.json());

// for parsing multipart/form-data
app.use(upload.array());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

/**
 *
 * The Routes
 */
app.get("/", (req, res) => {
  let j = {
    name: "Charlie",
    email: "email.co",
    gender: "Male",
    age: 25,
  };
  res.send(j);
});

app.get("/about", (req, res) => {
  // console.log(req.params);
  console.log(req.query);
  res.send("About World!");
});

//
// Users
//
//
// Data
let users = [
  { id: 1, name: "Jane", gender: "Female", email: "jane@ng.co" },
  { id: 2, name: "Charles", gender: "Male", email: "charles@nc.co" },
  { id: 3, name: "Li", gender: "Male", email: "li@one.co" },
  { id: 4, name: "Nginika", gender: "Female", email: "ng@one.co" },
];
//
//
app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/users/:id", (req, res) => {
  let id = req.params.id;
  let filterUser = users.filter((u) => u.id == id);
  let user = filterUser?.length ? filterUser[0] : {};

  res.send(user);
});

app.post("/users", (req, res) => {
  let data = req.body;
  let id = users[users.length - 1].id + 1; // users.reverse()[0].id
  let new_user = { ...data, id };

  users.push(new_user);

  // res.send(users);
  res.send({ data: new_user, message: "New User successfully created." });
});

app.put("/users/:id", (req, res) => {
  let data = req.body;
  let id = req.params.id;

  users = users.map((user) => {
    if (user.id == id) {
      user = { ...user, ...data };
      // if( data.name ) user.name = data.name
      // if( data.gender ) user.name = data.gender
      // if( data.email ) user.name = data.email
    }
    return user;
  });

  // res.send(users);
  res.send({ data: users, message: "User successfully updated." });
});

app.delete("/users/:id", (req, res) => {
  let id = req.params.id;

  // for (let i = 0; i < users.length; i++) {
  //   if( users[i].id == id ) {
  //   // do delete
  //   }
  // }

  users = users.filter((user) => user.id != id);

  // res.send(users);
  res.send({ data: users, message: "User successfully deleted." });
});

//
//
//

app.post("/about", (req, res) => {
  console.log(req.body);

  let data = req.body;
  data.message = "Posting About World!";

  // let data2 = {
  //   name: req.body.name || "Martins",
  //   other_name: req.body.other_name || "None",
  //   friend: req.body.friend || "No friend",
  //   message: "Posting About World!",
  // };

  res.send(data);
  // res.send("Posting About World!");
});

app.get("/contact", (req, res) => {
  res.send("Contact World!");
});

const port = 8554;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
