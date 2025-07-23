// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";
// import { remark } from "remark";
// import html from "remark-html";

// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ slug: string }> }
// ) {
//   try {
//     // Await the params
//     const { slug } = await params;

//     // Handle routing logic
//     let filename: string;

//     if (slug === "/" || slug === "homepage" || slug === "index") {
//       filename = "homepage.md";
//     } else {
//       console.log({ slug });
//       filename = `${slug}.md`;
//     }

//     const filePath = path.join(process.cwd(), "_pages", filename);
//     console.log({ filePath });
//     // Check if the markdown file exists
//     if (!fs.existsSync(filePath)) {
//       return NextResponse.json(
//         { error: `Page "${slug}" not found` },
//         { status: 404 }
//       );
//     }

//     // Read the markdown file
//     const fileContents = fs.readFileSync(filePath, "utf8");
//     const { data, content } = matter(fileContents);

//     // Convert markdown to HTML
//     const processedContent = await remark().use(html).process(content);
//     const contentHtml = processedContent.toString();

//     // Return JSON response with both metadata and content
//     return NextResponse.json({
//       title: data.title || slug.charAt(0).toUpperCase() + slug.slice(1),
//       content: contentHtml,
//       metadata: data,
//       slug: slug,
//       ...data,
//     });
//   } catch (error) {
//     console.error("Error fetching page:", error);
//     return NextResponse.json(
//       { error: "Failed to load page content" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { remark } from "remark";
import html from "remark-html";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO; // e.g., "username/repo-name"
console.log({ GITHUB_TOKEN });
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Handle routing logic
    let filename: string;
    if (slug === "/" || slug === "homepage" || slug === "index") {
      filename = "homepage.md";
    } else {
      filename = `${slug}.md`;
    }

    // Fetch from GitHub API
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/_pages/${filename}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Page "${slug}" not found` },
        { status: 404 }
      );
    }

    const data = await response.json();

    // Decode base64 content
    const content = Buffer.from(data.content, "base64").toString("utf-8");

    // Parse frontmatter
    const matter = await import("gray-matter");
    const { data: metadata, content: markdownContent } =
      matter.default(content);

    // Convert markdown to HTML
    const processedContent = await remark().use(html).process(markdownContent);
    const contentHtml = processedContent.toString();

    return NextResponse.json({
      title: metadata.title || slug.charAt(0).toUpperCase() + slug.slice(1),
      content: contentHtml,
      metadata: metadata,
      slug: slug,
      ...metadata,
    });
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json(
      { error: "Failed to load page content" },
      { status: 500 }
    );
  }
}
