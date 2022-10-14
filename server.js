const express = require("express");
const {
  forward,
  backward,
  left,
  right,
  startButton,
  selectButton,
  aButton,
  bButton,
  xButton,
  yButton,
  lbButton,
  rbButton,
  startGame,
} = require("./commands");
const app = express();
const port = 8080;

app.get("/", (req, res) => res.send(startGame()));
app.get("/forward", (req, res) => res.send(forward()));
app.get("/backward", (req, res) => res.send(backward()));
app.get("/left", (req, res) => res.send(left()));
app.get("/right", (req, res) => res.send(right()));
app.get("/start", (req, res) => res.send(startButton()));
app.get("/select", (req, res) => res.send(selectButton()));
app.get("/a", (req, res) => res.send(aButton()));
app.get("/b", (req, res) => res.send(bButton()));
app.get("/x", (req, res) => res.send(xButton()));
app.get("/y", (req, res) => res.send(yButton()));
app.get("/lb", (req, res) => res.send(lbButton()));
app.get("/rb", (req, res) => res.send(rbButton()));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
