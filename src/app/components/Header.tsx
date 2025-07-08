// components/Header.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Mobile Menu Button - Left Side */}
          <button
            className="lg:hidden flex items-center justify-center w-8 h-8 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Logo/Brand - Center */}
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 hover:text-blue-600 flex-1 flex justify-center md:flex-none md:justify-start"
            onClick={closeMobileMenu}
          >
            <Image
              src="/assets/Logo.png"
              alt="Selleryard Logo"
              width={265}
              height={35}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div
            className="hidden lg:flex space-x-8 font-semibold"
            style={{ fontSize: "22px" }}
          >
            <Link
              href="#features"
              className="hover:text-blue-600 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="hover:text-blue-600 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#affiliates"
              className="hover:text-blue-600 transition-colors"
            >
              Affiliates
            </Link>
            <Link
              href="#about"
              className="hover:text-blue-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="#demo"
              className="hover:text-blue-600 transition-colors"
            >
              Demo
            </Link>
            <Link
              href="#contact"
              className="hover:text-blue-600 transition-colors"
            >
              Contact Us
            </Link>
            {/* <Link
              href="/admin/index.html"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Admin
            </Link> */}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex space-x-4">
            <button className="px-6 py-2 text-purple-600 bg-blue1-light border-2 border-gray-100 rounded-lg font-semibold text-lg hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 cursor-pointer">
              Login
            </button>
            <button className="px-6 py-2 text-white bg-purple-600 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-all duration-200 shadow-md cursor-pointer">
              Sign Up
            </button>
          </div>

          {/* Profile Icon - Right Side Mobile */}
          <button
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Profile"
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2.61985C6.47715 2.61985 2 7.097 2 12.6198C2 18.1427 6.47715 22.6198 12 22.6198C17.5228 22.6198 22 18.1427 22 12.6198C22 7.097 17.5228 2.61985 12 2.61985Z"
                stroke="#7C63FD"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.27148 18.9655C4.27148 18.9655 6.50051 16.1198 12.0005 16.1198C17.5005 16.1198 19.7295 18.9655 19.7295 18.9655"
                stroke="#7C63FD"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 12.6198C13.6569 12.6198 15 11.2767 15 9.61985C15 7.96299 13.6569 6.61985 12 6.61985C10.3431 6.61985 9 7.96299 9 9.61985C9 11.2767 10.3431 12.6198 12 12.6198Z"
                stroke="#7C63FD"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-4 pb-2 space-y-1 border-t border-gray-200 mt-4">
            <Link
              href="#features"
              className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-3 rounded-md transition-colors font-medium"
              onClick={closeMobileMenu}
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-3 rounded-md transition-colors font-medium"
              onClick={closeMobileMenu}
            >
              Pricing
            </Link>
            <Link
              href="#affiliates"
              className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-3 rounded-md transition-colors font-medium"
              onClick={closeMobileMenu}
            >
              Affiliates
            </Link>
            <Link
              href="#about"
              className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-3 rounded-md transition-colors font-medium"
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <Link
              href="#demo"
              className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-3 rounded-md transition-colors font-medium"
              onClick={closeMobileMenu}
            >
              Demo
            </Link>
            <Link
              href="#contact"
              className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-3 rounded-md transition-colors font-medium"
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>
            <Link
              href="/admin/index.html"
              className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-3 rounded-md transition-colors font-medium"
              onClick={closeMobileMenu}
            >
              Admin
            </Link>

            {/* Mobile Auth Buttons */}
            <div className="pt-4 space-y-3">
              <button
                className="w-full px-4 py-3 text-purple-600 bg-blue1-light border-2 border-gray-100 rounded-lg font-semibold hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
                onClick={closeMobileMenu}
              >
                Login
              </button>
              <button
                className="w-full px-4 py-3 text-white bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-200 shadow-md"
                onClick={closeMobileMenu}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
