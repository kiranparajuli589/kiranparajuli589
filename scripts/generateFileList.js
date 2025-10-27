const fs = require("fs");
const path = require("path");

const blogsDir = path.join(__dirname, "public/blogBase");
const outputFile = path.join(__dirname, "public/blogs.json");

const files = fs.readdirSync(blogsDir).filter((file) => file.endsWith(".md"));

fs.writeFileSync(outputFile, JSON.stringify(files, null, 2), "utf-8");
console.log("files.json generated with markdown file list.");
