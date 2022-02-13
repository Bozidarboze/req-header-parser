require("dotenv").config();
var express = require("express");
var app = express();
var cors = require("cors");

app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/whoami", function (req, res) {
  const ipaddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const language = req.headers["accept-language"];
  const software = req.headers["user-agent"];

  res.json({ ipaddress, language, software });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log("Your app is listening on port " + PORT);
});
