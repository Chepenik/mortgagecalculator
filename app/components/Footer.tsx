import React from "react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => (
  <footer className="w-full text-center py-8 text-gray-600 dark:text-gray-400">
    <div className="max-w-3xl mx-auto px-4 mb-8 pb-8 border-b border-orange-200 dark:border-orange-900/30">
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 italic">
        Bitcoin represents the purest form of private property—a sovereign asset that no government or authority can seize if properly secured. It is true sound money, immune to inflation and confiscation. Yet while Bitcoin is secure and immutable, you cannot raise your family within it, cannot gather around a dinner table in it, cannot build irreplaceable memories within its code. A home is far more than an investment or store of value. It is where children grow, where love is built day after day, where family legacies are written across generations. This is the tradeoff worth contemplating: Bitcoin may moon to unimaginable heights, but no amount of wealth—however astronomical—can purchase the priceless moments of parenthood, the sanctuary of home, or the immeasurable love that only a family home can hold. Both have their place in a thoughtful financial strategy.
      </p>
    </div>
    © {new Date().getFullYear()} Sound Money Mortgage. All rights
    reserved.
    <div className="mt-2">
      <p>Connect with this app&apos;s creator:</p>
      <a
        href="https://www.linkedin.com/in/conorchepenik/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-600 mr-4"
      >
        <FaLinkedin className="inline mr-1" />
      </a>
      <a
        href="https://x.com/conorchepenik"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-500"
      >
        <FaTwitter className="inline mr-1" />
      </a>
    </div>
  </footer>
);

export default Footer;
