"use client";
import { useState, useEffect } from "react";
import Head from "next/head";

interface HeroSection {
  type: "hero";
  bg_color: string;
  hero_title_color: string;
  hero_desc_color: string;
  hero_section_title: string;
  hero_description: string;
}

interface ImageColumn {
  type: "image";
  image_url: string;
  alt_text: string;
  width?: string;
  height?: string;
}

interface ContentColumn {
  type: "content";
  title: string;
  title_highlight?: string;
  title_highlight_color?: string;
  description: string;
  text_align?: "left" | "center" | "right";
}

interface MultiColumnSection {
  type: "multi_column";
  bg_color: string;
  columns: (ImageColumn | ContentColumn)[];
}

interface Section {
  type: string;
  [key: string]: any;
}

interface HomepageData {
  title: string;
  description?: string;
  sections: Section[];
  content: string;
  date?: string;
}

export default function Home() {
  const [homepageData, setHomepageData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHomepage();
  }, []);

  const fetchHomepage = async () => {
    try {
      const response = await fetch("/api/homepage");
      if (!response.ok) {
        throw new Error("Failed to fetch homepage content");
      }
      const data = await response.json();
      setHomepageData(data);
    } catch (error) {
      console.error("Error fetching homepage:", error);
      setError("Failed to load homepage content");
    } finally {
      setLoading(false);
    }
  };

  const renderHeroSection = (section: HeroSection) => {
    return (
      <div
        key={`hero-${section.hero_section_title}`}
        className="flex items-center justify-center px-4 py-16"
        style={{ backgroundColor: section.bg_color }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-4xl font-bold mb-6"
            style={{ color: section.hero_title_color }}
          >
            {section.hero_section_title}
          </h1>
          <p
            className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
            style={{ color: section.hero_desc_color }}
          >
            {section.hero_description}
          </p>
        </div>
      </div>
    );
  };

  const renderMultiColumnSection = (section: MultiColumnSection) => {
    return (
      <div
        key={`multi-column-${Math.random()}`}
        className="py-16 px-4"
        style={{ backgroundColor: section.bg_color }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {section.columns.map((column, index) => (
              <div key={`column-${index}`} className="w-full">
                {column.type === "image" && (
                  <div className="flex justify-center">
                    <img
                      src={column.image_url}
                      alt={column.alt_text}
                      className="rounded-lg shadow-lg max-w-full h-auto"
                      style={{
                        maxWidth: column.width ? `${column.width}px` : "100%",
                        maxHeight: column.height
                          ? `${column.height}px`
                          : "auto",
                      }}
                    />
                  </div>
                )}

                {column.type === "content" && (
                  <div className={`text-${column.text_align || "left"}`}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                      {column.title}
                      {column.title_highlight && (
                        <span
                          className="block"
                          style={{
                            color: column.title_highlight_color || "#8b5cf6",
                          }}
                        >
                          {column.title_highlight}
                        </span>
                      )}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {column.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSection = (section: Section, index: number) => {
    switch (section.type) {
      case "hero":
        return renderHeroSection(section as HeroSection);
      case "multi_column":
        return renderMultiColumnSection(section as MultiColumnSection);
      default:
        return (
          <div key={`section-${index}`} className="py-8">
            <p className="text-gray-500 text-center">
              Section type "{section.type}" not implemented yet
            </p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !homepageData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <p className="text-lg text-red-600">
            {error || "Homepage not found"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{homepageData.title || "My Blog"}</title>
        <meta
          name="description"
          content={homepageData.description || "Welcome to my blog"}
        />
      </Head>

      <div className="min-h-screen">
        {/* Render sections */}
        {homepageData.sections && homepageData.sections.length > 0 ? (
          homepageData.sections.map((section, index) =>
            renderSection(section, index)
          )
        ) : (
          /* Fallback to regular content if no sections */
          <div className="container mx-auto px-4 py-8">
            <main>
              <div
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 hover:prose-a:text-blue-800"
                dangerouslySetInnerHTML={{ __html: homepageData.content }}
              />
            </main>
          </div>
        )}
      </div>
    </>
  );
}
