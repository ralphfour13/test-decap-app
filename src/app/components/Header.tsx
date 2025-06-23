// components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 hover:text-blue-600"
          >
            <img src={"../../assets/Logo.png"} alt="Selleryard Logo" />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8 text-xl font-semibold">
            <Link
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Affiliates
            </Link>
            <Link
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Demo
            </Link>
            <Link
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/admin/index.html"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Admin
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            <button className="px-8 py-3 text-purple-600 bg-blue-light border-2 border-gray-100 rounded-lg font-semibold text-lg hover:bg-purple-50 hover:border-purple-300 transition-all duration-200">
              Login
            </button>
            <button className="px-8 py-3 text-white bg-purple-600 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-all duration-200 shadow-md">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden flex flex-col space-y-1">
            <span className="block w-6 h-0.5 bg-gray-600"></span>
            <span className="block w-6 h-0.5 bg-gray-600"></span>
            <span className="block w-6 h-0.5 bg-gray-600"></span>
          </button>
        </div>

        {/* Mobile Navigation (you can expand this with state management) */}
        <div className="md:hidden mt-4 space-y-2">
          <Link
            href="/"
            className="block text-gray-700 hover:text-blue-600 py-2"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="block text-gray-700 hover:text-blue-600 py-2"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="block text-gray-700 hover:text-blue-600 py-2"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block text-gray-700 hover:text-blue-600 py-2"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
