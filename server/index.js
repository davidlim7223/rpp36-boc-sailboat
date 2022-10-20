const express = require("express");
const axios = require("axios");
const db = require("../db/postgres.js");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("client/public"));

app.post('/todo', function(req, res) {
  db.createTodo(req.body)
  .then(result => res.send(result))
})

app.get('/todos', function(req, res) {
  db.getTodos(req.query.id)
  .then(result => res.send(result))
})

app.delete('/todos', function(req, res) {
  console.log(req)
  db.deleteTodo(req.query.todoID)
  .then(res.send('DELETED'))
})

app.post('/category', function(req, res) {
  db.createCategory(req.body)
  .then(result => res.send(result))
})

app.get('/categories', function(req, res) {
  db.getCategories(req.query.id)
  .then(result => res.send(result))
})

app.put('/bookedApt', function(req, res) {
  db.bookAppointment(req.body)
  .then(result => res.send(result))
})

app.get("/test", (req, res) => {
  // res.send("Greetings!");
  res.status(200);
  res.end();
});

app.listen(port, () => {
console.log("listening on port: ", port);
});

module.exports = app;