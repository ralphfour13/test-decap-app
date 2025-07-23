import "./styles.css";

interface Feature {
  feature_title: string;
}

interface Tier {
  type: string;
  tier: string;
  monthly_price: string;
  tier_info: string;
  most_popular?: boolean;
  key_features: Feature[];
}

interface PricingSection {
  type: "pricing";
  price_title: string;
  price_desc: string;
  price_row: Tier[];
}

const renderPricingSection = (section: PricingSection, index: number) => {
  return (
    <div
      key={index}
      className="pricing-container py-16 px-4"
      // style={{ backgroundColor: section.bg_color }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="pricing-header text-center">
          <h2
            dangerouslySetInnerHTML={{ __html: section?.price_title }}
            style={{
              fontSize: "36px",
              fontWeight: "600",
            }}
          />
          <p
            dangerouslySetInnerHTML={{ __html: section?.price_desc }}
            style={{
              fontSize: "22px",
              fontWeight: "300",
              color: "#07051C",
            }}
          />
        </div>
        <div className="pricing-grid">
          {section?.price_row?.map((item: Tier, key: number) => {
            return (
              <div key={key}>
                <input
                  type="radio"
                  id={`tier-${key}`}
                  name="pricing-tier"
                  value={item?.tier}
                  className="pricing-radio"
                />
                <label htmlFor={`tier-${key}`} className="pricing-card">
                  {item?.most_popular ? (
                    <div className="mb-10">
                      <div className="popular-badge">MOST POPULAR</div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="tier-name">{item?.tier}</div>
                  <div className="price">
                    <span className="price-amount">{item?.monthly_price}</span>
                    <span className="price-period">
                      {item?.monthly_price.toLowerCase() === "custom"
                        ? ""
                        : "/month"}
                    </span>
                  </div>
                  <div className="tier-info">{item?.tier_info}</div>

                  <div className="features-wrapper">
                    <div className="features-title">Key Features</div>
                    <ul className="features-list">
                      {item?.key_features.map(
                        (feature: Feature, key: number) => {
                          return (
                            <li className="feature-item" key={key}>
                              <div className="feature-icon">
                                <svg
                                  width="19"
                                  height="18"
                                  viewBox="0 0 19 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M5.75 9.375L8 11.625L13.25 6.375"
                                    className="feature-icon"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M9.5 16.5C13.6421 16.5 17 13.1421 17 9C17 4.85786 13.6421 1.5 9.5 1.5C5.35786 1.5 2 4.85786 2 9C2 13.1421 5.35786 16.5 9.5 16.5Z"
                                    className="feature-icon"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <div
                                className="feature-title"
                                dangerouslySetInnerHTML={{
                                  __html: feature?.feature_title,
                                }}
                              />
                            </li>
                          );
                        }
                      )}
                    </ul>

                    {key === 3 ? (
                      ""
                    ) : (
                      <div className="disclaimer">*Whichever Comes First</div>
                    )}
                  </div>
                  <a className="cta-button" href="#">
                    Start Free Today
                  </a>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default renderPricingSection;
