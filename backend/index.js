var express = require("express");
var data = require("./data.json")
var app = express();
app.listen(7000, () => {
 console.log("Server running on port 7000");
});

app.get("/posts", (req, res, next) => {
  res.json(data);
 });
 