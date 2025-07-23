//@typescript-eslint/no-explicit-any
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import renderPricingSection from "../components/Pricing";

interface CTAInterface {
  bg_btn_color?: string;
  btn_text?: string;
  text_btn_color?: string;
}

interface HeroSection {
  type: "hero";
  bg_color: string;
  hero_title_color: string;
  hero_desc_color: string;
  hero_section_title: string;
  hero_description: string;
  hero_cta_1?: CTAInterface;
  hero_cta_2?: CTAInterface;
  hero_banner_img?: string;
  hero_mobile_banner_img?: string;
}

interface TestimonialInterface {
  customer_image: string;
  customer_name: string;
  customer_testimonial: string;
  star_rating: string;
  type: "testimonial";
}

interface ImageColumn {
  type: "image";
  image_url: string;
  alt_text: string;
  width?: string;
  height?: string;
}

interface ContentButton {
  bg_btn_color: string;
  btn_text: string;
  new_tab: boolean;
  text_btn_color: string;
}

interface ContentColumn {
  type: "content";
  title: string;
  title_highlight?: string;
  title_highlight_color?: string;
  description: string;
  button: ContentButton;
  text_align?: "left" | "center" | "right";
}

interface MultiColumnSection {
  type: "multi_column";
  bg_color: string;
  columns: (ImageColumn | ContentColumn)[];
}

interface TestimonialSection {
  type: "testimonials";
  testimonials: TestimonialInterface[];
}

interface WrappedImageSection {
  type: "wrapped_image";
  wrapped_image: string;
  alt_text: string;
}
interface Section {
  type: string;
  [key: string]: unknown;
}

interface PageData {
  slug: string;
  filename: string;
  title: string;
  description?: string;
  sections: Section[];
  content: string;
  date?: string;
}

interface Feature {
  feature_title: string;
}

interface Tier {
  type: string;
  tier: string;
  monthly_price: string;
  tier_info: string;
  key_features: Feature[];
}

interface PricingSection {
  type: "pricing";
  price_title: string;
  price_desc: string;
  price_row: Tier[];
}

interface AccordionTitleColumn {
  type: "title";
  title: string;
  description: string;
}

interface Accordion {
  acc_title: string;
  acc_content: string;
}

interface AccordionContentColumn {
  type: "accordions";
  accordion: Accordion[];
}

interface AccordionSection {
  type: "accordion";
  title: string;
  description: string;
  columns: (AccordionTitleColumn | AccordionContentColumn)[];
}
export default function Home() {
  const params = useParams();
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [openItems, setOpenItems] = useState([0, 1, 2]);

  // Get the slug from params
  const slug = Array.isArray(params?.slug)
    ? params.slug[0]
    : params?.slug || "homepage"; // Default to 'home' for homepag

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const fetchPageData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Determine API endpoint based on slug
      const endpoint = `/api/${slug}`;

      const response = await fetch(endpoint);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Page "${slug}" not found`);
        }
        throw new Error("Failed to fetch page content");
      }

      const data = await response.json();
      setPageData(data);
    } catch (error) {
      console.error("Error fetching page:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load page content"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch(`/api/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setPageData(data);
        }
      })
      .catch((err) => setError("Failed to load page"))
      .finally(() => setLoading(false));
  }, [slug]);

  const toggleAccordion = (index: number) => {
    setOpenItems((prevOpenItems) => {
      if (prevOpenItems.includes(index)) {
        return prevOpenItems.filter((item: number) => item !== index);
      } else {
        return [...prevOpenItems, index];
      }
    });
  };

  const getBackgroundImage = (section: HeroSection) => {
    if (isMobile && section?.hero_mobile_banner_img) {
      return `url(${section?.hero_mobile_banner_img})`;
    } else if (section?.hero_banner_img) {
      return `url(${section?.hero_banner_img})`;
    }
    return "none";
  };

  const renderHeroSection = (section: HeroSection, index: number) => {
    const { hero_cta_1, hero_cta_2 } = section ?? {};

    return (
      <div
        key={`hero-${index}`}
        className={`hero-wrapper-${index} flex items-center justify-center px-4 py-16`}
        style={{
          backgroundColor: section.bg_color,
          backgroundImage: getBackgroundImage(section),
          backgroundSize: isMobile ? "100%" : "cover",
          backgroundRepeat: "no-repeat",
          height: "auto",
        }}
      >
        <div
          className={`${
            isMobile ? "max-w-xl" : "max-w-4xl"
          } relative mx-auto text-center`}
        >
          <h1
            className={`hero-title-idx-${index} text-4xl font-bold mb-6`}
            style={{
              color: section.hero_title_color,
              fontSize: isMobile ? "28px" : "52px",
            }}
            dangerouslySetInnerHTML={{ __html: section.hero_section_title }}
          />
          <p
            className="text-lg md:text-xl leading-relaxed max-w-3xl mb-6 mx-auto"
            style={{ color: section.hero_desc_color }}
          >
            {section.hero_description}
          </p>
          <div
            className={`flex justify-center gap-8 ${
              isMobile ? "flex-col" : ""
            }`}
          >
            {hero_cta_1 ? (
              <Link
                href="#"
                style={{
                  display: "inline-block",
                  backgroundColor: hero_cta_1?.bg_btn_color,
                  color: hero_cta_1?.text_btn_color,
                  padding: "14px 46px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontSize: "22px",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  alignSelf: "center",
                  maxWidth: "fit-content",
                  zIndex: 122,
                }}
              >
                {hero_cta_1?.btn_text}
              </Link>
            ) : null}
            {hero_cta_2 && hero_cta_2?.btn_text ? (
              <Link
                href="#"
                style={{
                  display: "inline-block",
                  backgroundColor: hero_cta_2?.btn_text
                    ? hero_cta_2?.bg_btn_color
                    : "none",
                  color: hero_cta_2?.text_btn_color,
                  padding: "14px 46px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontSize: "22px",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                  border: hero_cta_2?.btn_text ? "1.75px solid #fff" : "none",
                  cursor: "pointer",
                  alignSelf: "center",
                  maxWidth: "fit-content",
                  zIndex: 122,
                }}
              >
                {hero_cta_2?.btn_text}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  const renderMultiColumnSection = (
    section: MultiColumnSection,
    index: number
  ) => {
    return (
      <div
        key={`multi-column-${Math.random()}`}
        className="py-16 px-4"
        style={{ backgroundColor: section.bg_color }}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`multi-col-wrapper-${index} ${
              slug === "pricing" && index === 3 ? "pricing-col" : ""
            } grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}
          >
            {section.columns.map((column, columnIndex) => (
              <div key={`column-${columnIndex}`} className="w-full">
                {column.type === "image" && (
                  <div className="flex justify-center">
                    <Image
                      src={column.image_url}
                      alt={column.alt_text}
                      width={2000}
                      height={800}
                      quality={100}
                      placeholder="empty"
                      priority={index === 0} // Priority for first section
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                      className="max-w-full h-auto"
                    />
                  </div>
                )}

                {column.type === "content" && (
                  <div className={`text-${column.text_align || "left"}`}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                      <span
                        dangerouslySetInnerHTML={{ __html: column.title }}
                      />
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
                    <p
                      className="text-lg text-gray-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: column.description }}
                    />
                    {column?.button && (
                      <div className="mt-15">
                        <a
                          href="#"
                          className="multi-col-button"
                          style={{
                            background: column?.button.bg_btn_color,
                            color: column?.button.text_btn_color,
                          }}
                        >
                          {column?.button?.btn_text}
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderTestimonials = (section: TestimonialSection, index: number) => {
    const testimonials = section.testimonials ?? [];
    return (
      <div
        key={index}
        className="py-16 px-4"
        style={{
          backgroundColor: "#F7F9FA",
        }}
      >
        <div
          className="grid gap-20 max-w-screen-2xl mx-auto items-center"
          style={{
            gridTemplateColumns: "repeat(2, 1fr)",
            display: isMobile ? "flex" : "",
            flexDirection: isMobile ? "column-reverse" : "initial",
          }}
        >
          <div className="testimonials-grid">
            {testimonials?.map((testimonial, testimonialIndex) => (
              <div className="testimonial-card" key={testimonialIndex}>
                <div
                  className="flex justify-between"
                  style={{
                    padding: "1rem",
                  }}
                >
                  <span className="star-rating">
                    {Array.from(
                      {
                        length: parseInt(testimonial.star_rating),
                      },
                      (_, i) => (
                        <span key={i}>
                          <svg
                            width="17"
                            height="17"
                            viewBox="0 0 17 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.49155 1.42913C7.70929 0.758986 8.65737 0.758986 8.87511 1.42913L10.3063 5.83395C10.4037 6.13365 10.683 6.33656 10.9981 6.33656H15.6296C16.3342 6.33656 16.6272 7.23823 16.0571 7.6524L12.3102 10.3747C12.0552 10.56 11.9486 10.8883 12.0459 11.188L13.4772 15.5928C13.6949 16.2629 12.9279 16.8202 12.3578 16.406L8.61087 13.6837C8.35594 13.4985 8.01072 13.4985 7.75579 13.6837L4.00882 16.406C3.43876 16.8202 2.67176 16.2629 2.8895 15.5928L4.32071 11.188C4.41809 10.8883 4.31141 10.56 4.05647 10.3747L0.309512 7.6524C-0.260546 7.23823 0.0324247 6.33656 0.737056 6.33656H5.36856C5.68368 6.33656 5.96296 6.13365 6.06034 5.83395L7.49155 1.42913Z"
                              fill="#5025AD"
                            />
                          </svg>
                        </span>
                      )
                    )}
                  </span>
                  <div className="flex gap-2 items-center">
                    <span>
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.66965 0.153076C4.06876 0.153076 0.339355 3.88319 0.339355 8.48337C0.339355 13.0843 4.06876 16.8137 8.66965 16.8137C13.2698 16.8137 17 13.0836 17 8.48337C17 3.88319 13.2698 0.153076 8.66965 0.153076ZM6.62889 10.7203C6.62889 11.1705 6.26406 11.5346 5.81456 11.5346C5.36435 11.5346 5.00023 11.1705 5.00023 10.7203V7.24847C5.00023 6.79826 5.36435 6.43344 5.81456 6.43344C6.26406 6.43344 6.62889 6.79826 6.62889 7.24847V10.7203ZM12.3814 10.6617C12.3814 11.2982 12.0095 11.5262 11.373 11.5262H8.44455C7.80804 11.5262 7.29221 11.0103 7.29221 10.3738V7.49333C7.29221 7.49333 7.23505 7.01419 7.7657 6.56398C8.06561 6.30924 8.51088 5.82304 8.82207 5.23311C9.44023 4.06101 9.81 3.71947 10.0916 3.81121C11.1345 4.14922 10.613 5.69532 10.2764 6.34099H11.2291C11.8649 6.34099 12.3814 6.85683 12.3814 7.49333V10.6617Z"
                          fill="#7C63FD"
                        />
                      </svg>
                    </span>
                    <span className="text-xs font-semibold">Testimonial</span>
                  </div>
                </div>
                <p className="testimonial-text">
                  {testimonial?.customer_testimonial}
                </p>
                <div className="customer-container">
                  <Image
                    className="rounded-full h-15 w-15"
                    src={testimonial.customer_image}
                    alt={testimonial.customer_name}
                    width={50.5}
                    height={50.5}
                  />
                  <h4 className="customer-name">{testimonial.customer_name}</h4>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonial-info-container">
            <h3 className="testimonial-info-header">
              What <span style={{ color: "#7C63FD" }}>Sellers</span> Are{" "}
              <span style={{ color: "#7C63FD" }}>Saying</span>
            </h3>
            <p className="testimonial-info-subheader">
              Join Thousands of Sellers—
              <span
                className="font-semibold"
                style={{
                  color: "#5025AD",
                }}
              >
                Try SellerYard Free!
              </span>
            </p>
            <div className="testimonial-info-wrapper">
              <div>
                <div className="info-title">00+</div>
                <p className="info-desc">Amazon Sellers Served</p>
              </div>
              <div>
                <div className="info-title">00+</div>
                <p>ASINs Tracked</p>
              </div>
              <div>
                <div className="info-title">00+</div>
                <p>Leads Tracked</p>
              </div>
              <div>
                <div className="info-title">00+</div>
                <p>Combined Revenue</p>
              </div>
            </div>
            <div>
              <Link
                href="#"
                style={{
                  display: "inline-block",
                  backgroundColor: "#7C63FD",
                  color: "#ffffff",
                  padding: "14px 46px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontSize: "22px",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  alignSelf: "center",
                  maxWidth: "fit-content",
                }}
              >
                Start Free Today
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderWrappedImage = (section: WrappedImageSection, index: number) => {
    return (
      <div
        key={index}
        className={`${
          !isMobile ? "wrapped-image-container" : "mobile-image-container"
        }  flex items-center justify-center px-4`}
      >
        <Image
          src={section?.wrapped_image}
          alt={section?.alt_text}
          width={2000}
          height={800}
          style={{
            width: isMobile ? "100%" : "86%",
            position: "relative",
            top: isMobile ? "-4rem" : "-10rem",
            maxWidth: "inherit",
            minWidth: "495px",
            marginRight: "3rem",
            height: "auto",
          }}
        />
      </div>
    );
  };

  const renderAccordionSection = (section: AccordionSection, index: number) => {
    return (
      <div key={`multi-column-${index}`} className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div
            className={`multi-col-wrapper-${index} grid grid-cols-1 lg:grid-cols-5 gap-12 items-center`}
          >
            {section.columns.map((column, columnIndex) => (
              <div
                key={`column-${columnIndex}`}
                className={`w-full ${
                  column.type === "title" ? "lg:col-span-3" : "lg:col-span-2"
                }`}
              >
                {column.type === "title" && (
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                      {column?.title}
                    </h2>
                    <p>{column?.description}</p>
                  </div>
                )}

                {column.type === "accordions" && (
                  <div className="max-w-2xl mx-auto bg-white rounded-lg overflow-hidden">
                    {column?.accordion?.map(
                      (accordion: Accordion, index: number) => {
                        return (
                          <div
                            className="accordion-item border-b last:border-b-0"
                            key={index}
                            style={{ borderColor: "#7C63FD" }}
                          >
                            <div
                              className={`p-5 cursor-pointer flex justify-between items-center transition-colors duration-300 select-none`}
                              onClick={() => toggleAccordion(index)}
                            >
                              <div
                                className="accordion-title font-semibold"
                                style={{ fontSize: "20px" }}
                              >
                                {accordion?.acc_title}
                              </div>
                              <div
                                className="accordion-icon"
                                style={{ color: "#7C63FD", fontSize: "2rem" }}
                              >
                                {openItems.includes(index) ? "-" : "+"}
                              </div>
                            </div>
                            <div
                              className={`overflow-hidden transition-all duration-300 bg-white ${
                                openItems.includes(index)
                                  ? "max-h-96"
                                  : "max-h-0"
                              }`}
                            >
                              <div className="accordion-body p-5 text-gray-600 leading-relaxed">
                                {accordion?.acc_content}
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
                <div className="mt-10">
                  <p className="need-more-info">
                    <span style={{ color: "#7C63FD" }}>Need more info?</span>{" "}
                    <span style={{ color: "#07051C" }}>
                      Reach out to our support team anytime.
                    </span>
                  </p>
                </div>
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
        return renderHeroSection(
          section as unknown as HeroSection,
          index as number
        );
      case "multi_column":
        return renderMultiColumnSection(
          section as unknown as MultiColumnSection,
          index as number
        );
      case "testimonials":
        return renderTestimonials(
          section as unknown as TestimonialSection,
          index as number
        );
      case "wrapped_image":
        return renderWrappedImage(
          section as unknown as WrappedImageSection,
          index as number
        );
      case "pricing":
        return renderPricingSection(
          section as unknown as PricingSection,
          index as number
        );
      case "accordion":
        return renderAccordionSection(
          section as unknown as AccordionSection,
          index as number
        );
      default:
        return (
          <div key={`section-${index}`} className="py-8">
            <p className="text-gray-500 text-center">
              Section type &quot;{section.type}&quot; not implemented yet
            </p>
          </div>
        );
    }
  };

  const createMarkup = (html: string) => {
    return { __html: html };
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

  if (error || !pageData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-red-600 mb-4">
            {error || "Page not found"}
          </p>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Go back to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{pageData.title || "My Blog"}</title>
        <meta
          name="description"
          content={pageData.description || `${pageData.title} page`}
        />
      </Head>

      <div className="min-h-screen">
        {/* Render sections */}
        {pageData.sections && pageData.sections.length > 0 ? (
          pageData.sections.map((section, index) =>
            renderSection(section, index)
          )
        ) : (
          /* Fallback to regular content if no sections */
          <div className="container mx-auto px-4 py-8">
            <main>
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {pageData.title}
              </h1>
              {pageData.description && (
                <p className="text-lg text-gray-600 mb-8">
                  {pageData.description}
                </p>
              )}
              <div
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 hover:prose-a:text-blue-800"
                dangerouslySetInnerHTML={createMarkup(pageData.content)}
              />
            </main>
          </div>
        )}
      </div>
    </>
  );
}
