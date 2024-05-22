const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT

//Define path for Express config
const publicdirpath = path.join(__dirname, "../public");
const viewspath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewspath);
hbs.registerPartials(partialspath);

//setup static directory to serve
app.use(express.static(publicdirpath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Banky tom",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you mush provide a location address!",
    });
  }

  res.send({
    forcast: "Weather is showing",
    location: "lagos",
    address: req.query.address,
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you mush provide a search term",
    });
  }
  console.log(req.query.search);

  res.send({
    products: [],
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me ",
    name: "Banky tom",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    helptext: "this some helpful text example",
    title: "Help",
    name: "Banky tom",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Banky tom",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Banky tom",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000.");
});
