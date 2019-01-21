require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.static('public/images'));

// Handlebars
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main",
        // helpers allows us to run 
        helpers: {
            section: function (name, options) {
                if (!this._sections) this._sections = {};
                this._sections[name] = options.fn(this);
                return null;
            }
        }
    })
);

app.set("view engine", "handlebars");

// Routes

require("./routes/viewRoutes")(app);

// Listener
app.listen(PORT, function () {
    console.log(`App listening on PORT: ${PORT}`);
});

module.exports = app;