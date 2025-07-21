import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Await the params
    const { slug } = await params;

    // Handle routing logic
    let filename: string;

    // Map routes to filenames
    if (slug === "/" || slug === "homepage" || slug === "index") {
      filename = "homepage.md";
    } else {
      filename = `${slug}.md`;
    }

    const filePath = path.join(process.cwd(), "content/page", filename);

    // Check if the markdown file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `Page '${slug}' not found` },
        { status: 404 }
      );
    }

    // Read the markdown file
    const fileContents = fs.readFileSync(filePath, "utf8");

    // Parse frontmatter and content
    const { data, content } = matter(fileContents);

    // Convert markdown to HTML (if there's any markdown content)
    let contentHtml = "";
    if (content.trim()) {
      const processedContent = await remark().use(html).process(content);
      contentHtml = processedContent.toString();
    }

    return NextResponse.json({
      slug,
      filename,
      title: data.title || `${slug} Page`,
      description: data.description,
      sections: data.sections || [],
      content: contentHtml,
      date: data.date,
      ...data, // Include any other frontmatter data
    });
  } catch (error) {
    console.error(`Error reading page:`, error);
    return NextResponse.json({ error: "Failed to load page" }, { status: 500 });
  }
}
