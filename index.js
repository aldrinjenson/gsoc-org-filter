const express = require("express");
const fs = require("fs");
var bodyParser = require("body-parser");
const app = express();
const gsocOrgs = require("./gsoc");
let orgs = gsocOrgs;

const shuffleArray = (array) => {
  // let curId = array.length;
  const sorted = array.sort((a, b) => a.favourite && a.slug < b.slug);
  // while (0 !== curId) {
  //   let randId = Math.floor(Math.random() * curId);
  //   curId -= 1;
  //   let tmp = array[curId];
  //   array[curId] = array[randId];
  //   array[randId] = tmp;
  // }
  return sorted;
};

app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home", { orgs: shuffleArray(orgs) });
});

app.post("/remove", (req, res) => {
  const { slug } = req.body;
  const newOrgs = orgs.filter((o) => o.slug != slug);
  orgs = newOrgs;
  fs.writeFileSync("gsoc.json", JSON.stringify(newOrgs));
  res.send("ok");
});

app.post("/favourite", (req, res) => {
  const { slug } = req.body;
  const newOrgs = orgs.map((o) => {
    if (o.slug === slug) {
      return { ...o, favourite: true };
    }
    return o;
  });
  orgs = newOrgs;
  fs.writeFileSync("gsoc.json", JSON.stringify(newOrgs));
  res.send("ok");
});

app.post("/addMsg", (req, res) => {
  console.log(req.body);
  const { slug, msg } = req.body;
  const newOrgs = orgs.map((o) => {
    if (o.slug === slug) {
      return { ...o, msg: msg };
    }
    return o;
  });
  orgs = newOrgs;
  fs.writeFileSync("gsoc.json", JSON.stringify(newOrgs));
  res.send("okay");
});
app.listen(5000);
