const geocode = require("./utilities/geocode");
const weatherForcast = require("./utilities/weatherForcast");
const path = require("path");
const hbs = require("hbs"); //for partials
const express = require("express"); //npm module for creating servers
const app = express();

//port
const port = process.env.PORT || 3000;

//telling express to check handlebars in views directory
app.set("views", path.join(__dirname, "../templates/views"));

//next two for setting of handlebars engine
app.set("view engine", "hbs");
//telling handlebars where my partials are
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

//to use static content for our website like css img(exposed folder)
app.use(express.static(path.join(__dirname, "../public")));

//express route handlers
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Deepak Jain",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Deepak Jain",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Drop your query at:- deepakjain263@gmail.com",
    title: "Help",
    name: "Deepak Jain",
  });
});

app.get("/weather", (req, res) => {
  //query string contains url parameters
  if (!req.query.address)
    return res.send({ error: "you must provide address!" });

  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) return res.send({ error });
      weatherForcast(longitude, latitude, (error, forcastData = "") => {
        if (error) return res.send({ error });
        res.send({
          forcast: forcastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error page",
    errorMessage: "Help article not found.",
    name: "Deepak Jain",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error",
    errorMessage: "404 Not Found!",
    name: "Deepak Jain",
  });
});

app.listen(port, () => {
  console.log("server is running on port " + port);
});
