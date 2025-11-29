"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaLinkedin, FaTwitter, FaHeart } from "react-icons/fa";
import { Bitcoin } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 px-4">
      <div className="text-center">
        {/* Animated 404 */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-8"
        >
          <div className="text-9xl md:text-[150px] font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 drop-shadow-lg">
            404
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4"
        >
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2">
            Lost in the Market?
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            This page doesn&apos;t exist, but your financial future can.
          </p>
        </motion.div>

        {/* Bitcoin Symbol Animation */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl mb-8 text-orange-500"
        >
          ₿
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-xl mx-auto"
        >
          But don&apos;t worry—head back to the calculator, or connect with me on one of these platforms to talk sound money.
        </motion.p>

        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Back to Calculator
          </Link>
        </motion.div>

        {/* Three Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <p className="text-gray-700 dark:text-gray-300 font-semibold mb-6 text-lg">
            Or connect with me:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/in/conorchepenik/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg transition-all duration-300 shadow-lg"
            >
              <FaLinkedin className="text-xl" />
              <span>LinkedIn</span>
            </motion.a>

            {/* Twitter/X */}
            <motion.a
              href="https://x.com/conorchepenik"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white font-bold rounded-lg transition-all duration-300 shadow-lg"
            >
              <FaTwitter className="text-xl" />
              <span>X / Twitter</span>
            </motion.a>

            {/* Ko-fi */}
            <motion.a
              href="https://ko-fi.com/chepenik"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold rounded-lg transition-all duration-300 shadow-lg"
            >
              <FaHeart className="text-xl" />
              <span>Support on Ko-fi</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Footer Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-sm text-gray-500 dark:text-gray-400 italic mt-12"
        >
          Every lost page is a chance to find something better. Let&apos;s build sound money together.
        </motion.p>
      </div>
    </div>
  );
}
