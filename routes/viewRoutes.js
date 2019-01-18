const path = require("path");

module.exports = function (app) {

    // Root Route
    app.get("/", function (req, res) {
        res.render("index", {
            pageTitle: "Scraper Scraper App"
        });
    });

    app.get("/profile", function (req, res) {
        res.render("profile", {
            pageTitle: "Profile Page"
        });
    });
}