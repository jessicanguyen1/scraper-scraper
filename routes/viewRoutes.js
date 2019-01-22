const path = require("path");
const cheerio = require("cheerio");
const request = require("request");
var results = [];

// Require all models
var db = require("../models");

// var newResults;

module.exports = function (app) {

    // Root Route
    app.get("/", function (req, res) {
        res.render("index", {
            pageTitle: "Scraper Scraper App",
            results: results
        });
    });

    app.get("/saved-articles", function (req, res) {
        res.render("saved-articles", {
            pageTitle: "Saved Articles",
            results: results
        });
    });

    // API routes
    app.get("/api/get-articles", function (req, res) {


        // Use library to scrape articles 
        request('https://www.marinij.com/news/', function (error, response, body) {
            if (!error && response.statusCode == 200) {

                let $ = cheerio.load(body);

                newResults = [];
                //console.log($('h5.entry-title').children())

                $('h5.entry-title').each(function (i, element) {
                    // Save the text of the element in a "title" variable
                    var title = $(element).text().trim();// In the currently selected element, look at its child elements (i.e., its a-tags),
                    // then save the values for any "href" attributes that the child elements may have
                    var link = $(element).children().attr("href");
                    // console.log(title)

                    // Save these results in an object that we'll push into the results array we defined earlier
                    results.push({
                        title: title,
                        link: link
                    });
                    console.log(results);

                    db.Article.findOne({ title: title }).then(function (data) {

                        console.log(data);

                        if (data === null) {

                            db.Article.create(result).then(function (dbArticle) {
                                res.json(dbArticle);
                            });
                        }
                    }).catch(function (err) {
                        res.json(err);
                    });

                });
            }
        });
        // console.log(results);
        // res.redirect("/");
    });

}