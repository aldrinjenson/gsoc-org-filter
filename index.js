const express = require("express");
const fs = require("fs");
var bodyParser = require("body-parser");
const app = express();
const gsocOrgs = require("./gsoc");
let orgs = gsocOrgs;

const shuffleArray = (array) => {
  // let curId = array.length;
  // const sorted = array.sort((a, b) => a.favourite && b.favourite);
  // // while (0 !== curId) {
  // //   let randId = Math.floor(Math.random() * curId);
  // //   curId -= 1;
  // //   let tmp = array[curId];
  // //   array[curId] = array[randId];
  // //   array[randId] = tmp;
  // // }
  return array;
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
  console.log(slug);
  let selected = {};
  const newOrgs = orgs.filter((o) => {
    if (o.slug === slug) {
      selected = { ...o, favourite: !o.favourite };
      return false;
    }
    return true;
  });
  newOrgs.unshift(selected);
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
