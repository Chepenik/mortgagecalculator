import React from "react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => (
  <footer className="w-full text-center py-4 text-gray-600 dark:text-gray-400">
    © {new Date().getFullYear()} Ultimate Mortgage Calculator. All rights
    reserved.
    <div className="mt-2">
      <p>Connect with this app's creator:</p>
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
