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
  banner_tagline?: string;
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
  badge?: string;
}

interface MultiColumnSection {
  type: "multi_column";
  bg_color: string;
  title: string;
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
  video_url: string;
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

interface AccordionBannerColumn {
  type: "faq_banner";
  faq_image: string;
}

interface Accordion {
  acc_title: string;
  acc_content: string;
}

interface AccordionContentColumn {
  type: "accordions";
  acc_col_title: string;
  accordion: Accordion[];
}

interface AccordionSection {
  type: "accordion";
  title: string;
  description: string;
  acc_footer: string;
  columns: (
    | AccordionTitleColumn
    | AccordionContentColumn
    | AccordionBannerColumn
  )[];
}

interface CardInfo {
  bg_btn_color: string;
  btn_text: string;
  new_tab: boolean;
  text_btn_color: string;
}

interface Card {
  card_desc: string;
  card_title: string;
  card_btn: CardInfo;
}

interface CardsSecion {
  type: "cards";
  title: string;
  cards: Card[];
  items_alignment: string | null;
}

interface FormFields {
  required: boolean;
  name: string;
  type: string;
}

interface ContactSection {
  type: "contact";
  image_url: string;
  title: string;
  description: string;
  alt_text: string;
  form_fields: FormFields[];
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
      .catch(() => setError("Failed to load page"))
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
            isMobile ? "max-w-xl" : "max-w-5xl"
          } relative mx-auto text-center`}
        >
          {section?.banner_tagline && (
            <div className="hero-tagline">{section?.banner_tagline}</div>
          )}
          <h2
            className={`hero-title-idx-${index} text-4xl font-bold mb-6`}
            style={{
              color: section.hero_title_color,
              // fontSize: isMobile ? "28px" : "52px",
            }}
            dangerouslySetInnerHTML={{ __html: section.hero_section_title }}
          />
          <p
            className="text-lg md:text-xl leading-relaxed container mb-6 mx-auto"
            style={{ color: section.hero_desc_color }}
            dangerouslySetInnerHTML={{
              __html: section.hero_description,
            }}
          ></p>
          <div
            className={`flex justify-center gap-8 ${
              isMobile ? "flex-col" : ""
            }`}
          >
            {hero_cta_1 && hero_cta_1?.btn_text ? (
              <Link
                href="#"
                className={`${
                  slug === "demo" ? "main-banner-btn" : "secondary-banner-btn"
                }`}
                style={{
                  display: "inline-block",
                  backgroundColor: hero_cta_1?.bg_btn_color,
                  color: hero_cta_1?.text_btn_color,
                  padding: "14px 46px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  // fontSize: "22px",
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
                className={`${
                  slug === "demo" ? "main-banner-btn" : "secondary-banner-btn"
                }`}
                style={{
                  display: "inline-block",
                  backgroundColor: hero_cta_2?.btn_text
                    ? hero_cta_2?.bg_btn_color
                    : "none",
                  color: hero_cta_2?.text_btn_color,
                  padding: "14px 46px",
                  borderRadius: "10px",
                  textDecoration: "none",
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
        className="py-8 px-4"
        style={{ backgroundColor: section.bg_color }}
      >
        {section?.title && (
          <h2
            className="text-3xl md:text-4xl font-bold mt-5 text-center"
            dangerouslySetInnerHTML={{
              __html: section?.title,
            }}
          />
        )}

        <div
          className={`container mx-auto multi-col-wrapper-${index} ${
            slug === "pricing" && index === 3 ? "pricing-col" : ""
          } ${
            slug === "about" && index === 3 ? "about-col" : ""
          } grid grid-cols-1 lg:grid-cols-${
            section.columns?.length === 1 ? "1" : "2"
          } gap-5 md:gap-12 items-center`}
        >
          {section.columns.map((column, columnIndex) => (
            <div key={`column-${columnIndex}`} className="w-full">
              {column.type === "image" && (
                <div
                  className={`flex justify-center ${
                    section.columns?.length === 1
                      ? "single-col-banner"
                      : "multi-col-banner"
                  }`}
                  style={{
                    backgroundImage: `url(${column?.image_url})`,
                    width: "100%",
                    backgroundPosition:
                      section.columns?.length === 1 ? "initial" : "center",
                    backgroundSize: isMobile ? "450px" : "cover",
                    backgroundRepeat: "no-repeat",
                    margin: "0 auto",
                  }}
                />
              )}

              {column.type === "content" && (
                <div className={`text-${column.text_align || "left"}`}>
                  {column?.badge ? (
                    <div
                      className="content-badge mb-5"
                      dangerouslySetInnerHTML={{ __html: column.badge }}
                    />
                  ) : null}
                  {column?.title && (
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                      <span
                        dangerouslySetInnerHTML={{ __html: column.title }}
                      />
                      {column.title_highlight && (
                        <span
                          className="content-highlight mt-5 block"
                          style={{
                            color: column.title_highlight_color || "#8b5cf6",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: column.title_highlight,
                          }}
                        />
                      )}
                    </h2>
                  )}
                  <p
                    className="text-lg text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: column.description }}
                  />
                  {column?.button?.btn_text ? (
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
                  ) : null}
                </div>
              )}
            </div>
          ))}
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
        {section?.video_url ? (
          <video
            width="800"
            height="450"
            style={{
              width: isMobile ? "100%" : "86%",
              position: "relative",
              top: isMobile ? "-4rem" : "-10rem",
              maxWidth: "inherit",
              minWidth: "495px",
              marginRight: "3rem",
              height: "auto",
            }}
            poster={section?.wrapped_image}
          >
            <source src={section?.video_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
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
              minWidth: isMobile ? "450px" : "495px",
              marginRight: "3rem",
              height: "auto",
            }}
          />
        )}
      </div>
    );
  };

  const renderAccordionSection = (section: AccordionSection, index: number) => {
    return (
      <div key={`multi-column-${index}`} className="py-8 px-4">
        <div className="container mx-auto">
          <div
            className={`multi-col-wrapper-${index} grid grid-cols-1 lg:grid-cols-5 gap-12 items-center`}
          >
            {section.columns.map((column, columnIndex) => (
              <div
                key={`column-${columnIndex}`}
                className={`w-full ${
                  column.type === "title" || column?.type === "faq_banner"
                    ? "lg:col-span-2"
                    : "lg:col-span-3"
                }`}
              >
                {column?.type === "faq_banner" && (
                  <div
                    className="relative accordion-banner"
                    style={{
                      backgroundImage: `url(${column?.faq_image})`,
                      width: "100%",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                )}

                {column.type === "title" && column?.title ? (
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                      {column?.title}
                    </h2>
                    <p>{column?.description}</p>
                  </div>
                ) : null}

                {column.type === "accordions" && (
                  <div className="max-w-2xl mx-auto bg-white rounded-lg overflow-hidden">
                    {column?.acc_col_title && (
                      <h3
                        className="acc_title"
                        dangerouslySetInnerHTML={{
                          __html: column?.acc_col_title,
                        }}
                      />
                    )}
                    {column?.accordion?.map(
                      (accordion: Accordion, index: number) => {
                        return (
                          <div
                            className="accordion-item mb-3 border-b"
                            key={index}
                            style={{ borderColor: "#7C63FD" }}
                          >
                            <div
                              className={`cursor-pointer flex justify-between items-center transition-colors duration-300 select-none`}
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
                              <div className="accordion-body text-gray-600 leading-relaxed">
                                {accordion?.acc_content}
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          {section?.acc_footer && (
            <div className="mt-10 text-right">
              <p
                className="need-more-info"
                dangerouslySetInnerHTML={{ __html: section?.acc_footer }}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCardsSections = (section: CardsSecion, index: number) => {
    return (
      <div key={index} className="cards-container">
        <div className="cards-header">
          {section?.title && (
            <h2
              className="text-3xl md:text-4xl font-bold mb-6 text-center"
              dangerouslySetInnerHTML={{
                __html: section?.title,
              }}
            />
          )}
        </div>
        <div className="cards-grid">
          {section?.cards?.map((item: Card, index: number) => {
            return (
              <div
                className="item-card"
                key={index}
                style={{ textAlign: "left" }}
              >
                <h3 className="card-header">{item.card_title}</h3>
                <p className="card-content">{item.card_desc}</p>
                {item?.card_btn?.btn_text ? (
                  <div>
                    <a
                      href="#"
                      className="contact-submit-btn"
                      style={{
                        display: "inline-block",
                        backgroundColor: item?.card_btn?.bg_btn_color,
                        color: item?.card_btn?.text_btn_color,
                        padding: "14px 46px",
                        borderRadius: "10px",
                        textDecoration: "none",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                        // border: "1.75px solid #fff",
                        cursor: "pointer",
                        maxWidth: "fit-content",
                      }}
                    >
                      {item?.card_btn?.btn_text}
                    </a>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderContactSection = (section: ContactSection, index: number) => {
    return (
      <div className="container mx-auto" key={index}>
        <div className="bg-white rounded-lg p-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* <Image
              src={section?.image_url}
              alt={section?.alt_text}
              className="rounded-lg"
              width={1200}
              height={600}
            /> */}
            {section?.image_url ? (
              <div
                className="relative contact-banner"
                style={{
                  backgroundImage: `url(${section?.image_url})`,
                  width: "100%",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              />
            ) : null}

            <div>
              {section?.title && (
                <h2
                  className="text-3xl md:text-4xl font-bold mb-6"
                  dangerouslySetInnerHTML={{
                    __html: section?.title,
                  }}
                />
              )}

              {section?.description && (
                <p
                  className="text-lg text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: section?.description,
                  }}
                />
              )}

              <form className="space-y-6">
                {section?.form_fields?.map((item: FormFields, key: number) => {
                  return (
                    <div key={key}>
                      <div>
                        {item?.type === "textarea" && (
                          <div>
                            <textarea
                              placeholder="Message"
                              rows={5}
                              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 resize-none"
                              style={{
                                border: "1px solid #5025AD",
                                opacity: "0.6",
                              }}
                            ></textarea>
                          </div>
                        )}

                        {item?.name === "Name" ||
                          (item?.name === "Email" && (
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <input
                                  type="text"
                                  placeholder="Name"
                                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                                  style={{
                                    border: "1px solid #5025AD",
                                    opacity: "0.6",
                                  }}
                                />
                              </div>
                              <div>
                                <input
                                  type="email"
                                  placeholder="Email"
                                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                                  style={{
                                    border: "1px solid #5025AD",
                                    opacity: "0.6",
                                  }}
                                />
                              </div>
                            </div>
                          ))}

                        {item?.name === "Subject" && (
                          <div className="relative">
                            <select
                              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-gray-500"
                              style={{
                                border: "1px solid #5025AD",
                                opacity: "0.6",
                              }}
                            >
                              <option value="">Subject</option>
                              <option value="general">General Inquiry</option>
                              <option value="support">Support</option>
                              <option value="business">Business</option>
                              <option value="other">Other</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              <svg
                                className="w-5 h-5 text-black"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 9l-7 7-7-7"
                                ></path>
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </form>
              <div>
                <button
                  type="submit"
                  className="contact-submit-btn hover:bg-blue-700 text-white font-medium mt-2 px-8 py-3 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  style={{
                    backgroundColor: "#7C63FD",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderNumberedCardsSection = (section: CardsSecion, index: number) => {
    return (
      <div key={index} className="py-8 px-4">
        <div className="container mx-auto">
          <div className="cards-header">
            {section?.title && (
              <h2
                className="text-3xl md:text-4xl font-bold mb-6 text-center"
                dangerouslySetInnerHTML={{
                  __html: section?.title,
                }}
              />
            )}
          </div>
          <div className="numbered-cards-grid" style={{ marginTop: "4rem" }}>
            {section?.cards?.map((item: Card, index: number) => {
              return (
                <div
                  className="item-numbered-card relative"
                  key={index}
                  style={{
                    textAlign:
                      (section?.items_alignment as React.CSSProperties["textAlign"]) ||
                      "left",
                  }}
                >
                  <div className="card-idx-container">
                    <div className="numbered-card-idx">{index + 1}</div>
                  </div>
                  <h3 className="card-header">{item.card_title}</h3>
                  <p className="card-content">{item.card_desc}</p>
                  {item?.card_btn?.btn_text ? (
                    <div>
                      <a
                        href="#"
                        className="contact-submit-btn"
                        style={{
                          display: "inline-block",
                          backgroundColor: item?.card_btn?.bg_btn_color,
                          color: item?.card_btn?.text_btn_color,
                          padding: "14px 46px",
                          borderRadius: "10px",
                          textDecoration: "none",
                          fontWeight: "600",
                          transition: "all 0.3s ease",
                          // border: "1.75px solid #fff",
                          cursor: "pointer",
                          maxWidth: "fit-content",
                        }}
                      >
                        {item?.card_btn?.btn_text}
                      </a>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderAccountFormSection = (section: ContactSection, index: number) => {
    return (
      <div className="container mx-auto" key={index}>
        <div className="py-10">
          <div className="grid lg:grid-cols-2 gap-15 items-center">
            <div>
              <h2
                className="account-header mb-3"
                dangerouslySetInnerHTML={{
                  __html: section?.title,
                }}
              />
              <p
                className="account-desc mb-3 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: section?.description,
                }}
              />

              <form className="space-y-6">
                {section?.form_fields?.map((item: FormFields, key: number) => {
                  return (
                    <div className="relative" key={key}>
                      {item?.name === "First Name" && (
                        <input
                          type={item?.type}
                          placeholder={item?.name}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                          style={{
                            border: "1px solid #5025AD",
                            opacity: "0.6",
                          }}
                        />
                      )}

                      {item?.name === "Last Name" && (
                        <input
                          type={item?.type}
                          placeholder={item?.name}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                          style={{
                            border: "1px solid #5025AD",
                            opacity: "0.6",
                          }}
                        />
                      )}

                      {item?.name === "Email" && (
                        <input
                          type={item?.type}
                          placeholder={item?.name}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                          style={{
                            border: "1px solid #5025AD",
                            opacity: "0.6",
                          }}
                        />
                      )}

                      {item?.name === "Password" && (
                        <input
                          type={item?.type}
                          placeholder={item?.name}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                          style={{
                            border: "1px solid #5025AD",
                            opacity: "0.6",
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </form>
              <div>
                <button
                  type="submit"
                  className="w-full hover:bg-blue-700 text-white font-medium mt-5 px-8 py-3 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  style={{
                    backgroundColor: "#7C63FD",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  {slug === "login" ? "Submit" : "Create Account"}
                </button>
              </div>
              {slug === "login" ? (
                <div className="account-footer">
                  <div>
                    Don&apos;t have an account?{" "}
                    <a
                      href="sign-up"
                      style={{ color: "#5025AD", textDecoration: "underline" }}
                    >
                      Sign Up
                    </a>
                  </div>
                  <div>
                    <a href="#">Forgot your Password?</a>
                  </div>
                </div>
              ) : (
                <div className="account-footer">
                  <div>
                    Already have an account?{" "}
                    <a
                      href="login"
                      style={{ color: "#5025AD", textDecoration: "underline" }}
                    >
                      Login
                    </a>
                  </div>
                </div>
              )}
            </div>

            {section?.image_url ? (
              <div
                className="relative account-banner"
                style={{
                  backgroundImage: `url(${section?.image_url})`,
                  width: "100%",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              />
            ) : null}
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
      case "cards":
        return renderCardsSections(
          section as unknown as CardsSecion,
          index as number
        );
      case "contact":
        return renderContactSection(
          section as unknown as ContactSection,
          index as number
        );
      case "number_cards":
        return renderNumberedCardsSection(
          section as unknown as CardsSecion,
          index as number
        );
      case "account_form":
        return renderAccountFormSection(
          section as unknown as ContactSection,
          index as number
        );
      default:
        return (
          <div key={`section-${index}`}>
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
        <title>{pageData.title || "SellerYard"}</title>
        <meta
          name="description"
          content={pageData.description || `${pageData.title} page`}
        />
      </Head>

      <div style={{ minHeight: "75vh" }}>
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
