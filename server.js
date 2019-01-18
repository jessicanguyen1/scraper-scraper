const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const exhbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const request = require("request");

app.get("/", function (req, res) {
    res.json({ testing: "works" })
});

// Listener
app.listen(PORT, function () {
    console.log(`App listening on PORT: ${PORT}`);
});