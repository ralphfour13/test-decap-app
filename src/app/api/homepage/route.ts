import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export async function GET() {
  try {
    const homepagePath = path.join(
      process.cwd(),
      "content",
      "page",
      "homepage.md"
    );

    // Check if homepage.md exists
    if (!fs.existsSync(homepagePath)) {
      return NextResponse.json(
        { error: "Homepage not found" },
        { status: 404 }
      );
    }

    // Read the markdown file
    const fileContents = fs.readFileSync(homepagePath, "utf8");

    // Parse frontmatter and content
    const { data, content } = matter(fileContents);

    // Convert markdown to HTML (if there's any markdown content)
    let contentHtml = "";
    if (content.trim()) {
      const processedContent = await remark().use(html).process(content);
      contentHtml = processedContent.toString();
    }

    return NextResponse.json({
      title: data.title || "Welcome to My Blog",
      description: data.description,
      sections: data.sections || [],
      content: contentHtml,
      date: data.date,
      ...data, // Include any other frontmatter data
    });
  } catch (error) {
    console.error("Error reading homepage:", error);
    return NextResponse.json(
      { error: "Failed to load homepage" },
      { status: 500 }
    );
  }
}
