const fs = require("fs");
const { orgs } = require("./gsoc");
// const categories = [];
// const tech_tags = [];

// orgs.forEach((o) => {
//   categories.push(...o.categories);
//   tech_tags.push({ name: o.name, skills: o.tech_tags });
// });
// console.log([...new Set(categories)]);
// console.log([...new Set(tech_tags)]);
// console.log([...new Set(tech_tags)].length);

// console.log(orgs.length);
// const keys = [];
// orgs.forEach((o) => keys.push(...Object.keys(o)));
// console.log([...new Set(keys)]);

// const bioOrgs = orgs
//   .filter((o) => o.categories.includes("Science and medicine"))
//   .map((o, index) => ({
//     id: index,
//     name: o.name,
//     tagline: o.tagline,
//     skills: o.tech_tags,
//     topicTags: o.topic_tags,
//     ideasLink: o.ideas_link,
//     websiteLink: o.website_url,
//     categories: o.categories,
//   }));
// console.log(bioOrgs);
// console.log(bioOrgs.length);
// fs.writeFileSync("bioOrgs.js", JSON.stringify(bioOrgs));
