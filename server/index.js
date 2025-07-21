const express = require("express");
const path = require("path");
const fs = require("fs/promises");

const app = express();
const port = 3000;

app.get("pages", async (req, res) => {
  const postsDirectory = path.join(process.cwd(), "pages");
  try {
    const fileNames = await fs.readdir(postsDirectory);
    const slugs = fileNames.map((fileName) => fileName.replace(/\.md$/, ""));
    res.json(slugs);
  } catch (err) {
    res.status(500).json({ err: "Failed to read blog posts" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
