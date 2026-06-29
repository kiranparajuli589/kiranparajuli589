const fs = require("fs");
const path = require("path");

const blogsDir = path.join(__dirname, "../public/blogBase");
const outputFile = path.join(__dirname, "../public/blogs.json");

function getFrontMatterDate(filePath) {
	const content = fs.readFileSync(filePath, "utf-8");
	const match = content.match(/^---\n([\s\S]*?)\n---/);
	if (!match) return 0;

	const dateMatch = match[1].match(/^date:\s*(.+)$/m);
	if (!dateMatch) return 0;

	const timestamp = new Date(dateMatch[1].trim()).getTime();
	return Number.isNaN(timestamp) ? 0 : timestamp;
}

const files = fs
	.readdirSync(blogsDir)
	.filter((file) => file.endsWith(".md"))
	.sort(
		(a, b) =>
			getFrontMatterDate(path.join(blogsDir, b)) -
			getFrontMatterDate(path.join(blogsDir, a)),
	);

fs.writeFileSync(outputFile, JSON.stringify(files, null, 2), "utf-8");
console.log("blogs.json generated with markdown file list (newest first).");
