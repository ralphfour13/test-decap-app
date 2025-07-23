// components/Footer.tsx
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-black">
      <div className="container mx-auto py-12">
        <div className="footer-links-grid grid grid-cols-1 gap-8">
          {/* Brand/About */}
          <div className="flex flex-col gap-8">
            <div>
              <Image
                src={"/assets/Logo.png"}
                alt="Selleryard Logo"
                width={265}
                height={35}
              />
            </div>
            <div className="flex items-center gap-3">
              <Image
                src={"/assets/barcode.png"}
                alt="Barcode"
                width={51}
                height={51}
              />
              <span className="font-semibold">Download the Mobile App</span>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src={"/assets/GooglePlay.png"}
                className="cursor-pointer"
                alt="Google Play"
                width={164}
                height={47}
              />
              <Image
                src={"/assets/Group.png"}
                className="cursor-pointer"
                alt="App Store"
                width={164}
                height={47}
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-links-header font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  // className="text-gray-300 hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link href="#">Affiliates</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="#">Demo</Link>
              </li>
              <li>
                <Link href="#">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Helpful Links */}
          <div>
            <h4 className="footer-links-header font-semibold mb-4">
              Helpful Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer-links-header font-semibold mb-4">
              Contact Us
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="flex items-center gap-3">
                  <span>
                    <svg
                      width="32"
                      height="33"
                      viewBox="0 0 32 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        y="0.0332031"
                        width="32"
                        height="32"
                        rx="5"
                        fill="#7C63FD"
                      />
                      <g clipPath="url(#clip0_546_1670)">
                        <path
                          d="M20.0788 17.8347L17.3334 18.3667C15.4789 17.4359 14.3334 16.3667 13.6667 14.7L14.18 11.9466L13.2097 9.3667L11.3956 9.3667C10.268 9.3667 9.38088 10.2991 9.59361 11.4064C9.96256 13.3269 10.8544 16.221 13 18.3667C15.256 20.6227 18.3954 21.743 20.477 22.2711C21.6324 22.5643 22.6667 21.6575 22.6667 20.4655L22.6667 18.8208L20.0788 17.8347Z"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_546_1670">
                          <rect
                            width="16"
                            height="16"
                            fill="white"
                            transform="translate(8 8.0332)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  <span>+1 (234) 567-8901</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center gap-3">
                  <span>
                    <svg
                      width="32"
                      height="33"
                      viewBox="0 0 32 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        y="0.0332031"
                        width="32"
                        height="32"
                        rx="5"
                        fill="#7C63FD"
                      />
                      <path
                        d="M12.6666 14.0334L16 16.3667L19.3333 14.0334"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.33337 18.7V13.3667C9.33337 12.2621 10.2288 11.3667 11.3334 11.3667H20.6667C21.7713 11.3667 22.6667 12.2621 22.6667 13.3667V18.7C22.6667 19.8046 21.7713 20.7 20.6667 20.7H11.3334C10.2288 20.7 9.33337 19.8046 9.33337 18.7Z"
                        stroke="white"
                      />
                    </svg>
                  </span>
                  <span>loremipsum@email.com</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="copyright flex justify-between items-center border-t border-gray-200 mt-8 pt-8">
          <p>© {currentYear} SellerYard. All rights reserved.</p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <svg
                width="32"
                height="33"
                viewBox="0 0 32 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="0.0332031"
                  width="32"
                  height="32"
                  rx="5"
                  fill="#7C63FD"
                />
                <path
                  d="M21 6.0332H18C16.6739 6.0332 15.4021 6.55999 14.4645 7.49767C13.5268 8.43535 13 9.70712 13 11.0332V14.0332H10V18.0332H13V26.0332H17V18.0332H20L21 14.0332H17V11.0332C17 10.768 17.1054 10.5136 17.2929 10.3261C17.4804 10.1386 17.7348 10.0332 18 10.0332H21V6.0332Z"
                  stroke="white"
                />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <svg
                width="32"
                height="33"
                viewBox="0 0 32 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="0.0332031"
                  width="32"
                  height="32"
                  rx="5"
                  fill="#7C63FD"
                />
                <path
                  d="M16 20.0332C18.2091 20.0332 20 18.2423 20 16.0332C20 13.8241 18.2091 12.0332 16 12.0332C13.7909 12.0332 12 13.8241 12 16.0332C12 18.2423 13.7909 20.0332 16 20.0332Z"
                  stroke="white"
                />
                <path
                  d="M7 23.0332V9.0332C7 7.92863 7.89543 7.0332 9 7.0332H23C24.1046 7.0332 25 7.92863 25 9.0332V23.0332C25 24.1378 24.1046 25.0332 23 25.0332H9C7.89543 25.0332 7 24.1378 7 23.0332Z"
                  stroke="white"
                />
                <path d="M21.5 10.5432L21.51 10.5321" stroke="white" />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <svg
                width="32"
                height="33"
                viewBox="0 0 32 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="0.0332031"
                  width="32"
                  height="32"
                  rx="5"
                  fill="#7C63FD"
                />
                <path
                  d="M20.025 9.68896H22.172L17.482 15.063L23 22.377H18.68L15.294 17.942L11.424 22.377H9.275L14.291 16.627L9 9.68996H13.43L16.486 13.743L20.025 9.68896ZM19.27 21.089H20.46L12.78 10.91H11.504L19.27 21.089Z"
                  fill="white"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
