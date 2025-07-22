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

    if (slug === "/" || slug === "homepage" || slug === "index") {
      filename = "homepage.md";
    } else {
      filename = `${slug}.md`;
    }

    const filePath = path.join(process.cwd(), "src/content/page", filename);

    // Check if the markdown file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `Page "${slug}" not found` },
        { status: 404 }
      );
    }

    // Read the markdown file
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    // Convert markdown to HTML
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    // Return JSON response with both metadata and content
    return NextResponse.json({
      title: data.title || slug.charAt(0).toUpperCase() + slug.slice(1),
      content: contentHtml,
      metadata: data,
      slug: slug,
      ...data,
    });
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json(
      { error: "Failed to load page content" },
      { status: 500 }
    );
  }
}
