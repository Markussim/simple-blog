const express = require("express");
const app = express();
const port = 3000;
const ip = require("ip");
const md = require("markdown-it")();
const fs = require("fs");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home", {
    sitelist: getBlogs(),
  });
});

app.get("/blog/:blog", (req, res) => {
  const blogFile = req.params.blog + ".md";
  const blogContent = fs.readFileSync("./markdown/" + blogFile, "utf8");
  res.render("blog.ejs", {
    html: md.render(blogContent),
  });
});

app.listen(port, () => {
  console.log(
    `\nApp running at:\n- Local: \x1b[36mhttp://localhost:${port}/\x1b[0m\n- Network \x1b[36mhttp://${ip.address()}:${port}/\x1b[0m\n\nTo run for production, run \x1b[36mnpm run start\x1b[0m`
  );
});

function getBlogs() {
  let sitelist = [];
  fs.readdirSync("./markdown").forEach(function (file) {
    if (file.endsWith(".md")) {
      sitelist.push(file.substring(0, file.length - 3));
    }
  });
  return sitelist;
}
