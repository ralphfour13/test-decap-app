import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function handler(req, res) {
  const postsDirectory = path.join(process.cwd(), "content/blog");
  console.log({ postsDirectory });
  try {
    const filenames = fs.readdirSync(postsDirectory);
    const posts = filenames
      .filter((name) => name.endsWith(".md"))
      .map((name) => {
        const filePath = path.join(postsDirectory, name);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContents);

        return {
          slug: name.replace(".md", ""),
          frontmatter: data,
          content: content,
          excerpt: content.slice(0, 150) + "...",
        };
      })
      .sort(
        (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
      );

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to load posts" });
  }
}
