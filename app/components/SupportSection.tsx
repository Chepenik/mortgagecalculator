"use client";
import React from "react";
import { motion } from "framer-motion";
import { Heart, BookOpen } from "lucide-react";

const SupportSection: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-orange-500/20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Heart className="h-8 w-8 text-orange-500" />
            Support the Project
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            This calculator helps you make smarter financial decisions. If it&apos;s provided value, here are two ways you can support my work and keep building cool projects.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Bitcoin Coloring Book */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-500/30 rounded-xl p-8 hover:border-orange-500/50 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-8 w-8 text-orange-400" />
              <h3 className="text-2xl font-bold text-white">Bitcoin Coloring Book</h3>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Teach kids (and curious adults) about sound money principles through beautiful art. Learn why Bitcoin matters for your family's financial future while enjoying quality time together.
            </p>
            <ul className="space-y-2 mb-6 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-orange-400">✓</span>
                <span>Beautiful illustrations paired with Bitcoin education</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-400">✓</span>
                <span>Sound money principles kids can understand</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-400">✓</span>
                <span>Perfect for ages 2–10 (and parents too)</span>
              </li>
            </ul>
            <a
              href="https://www.amazon.com/Bitcoin-Coloring-Book-Conor-Chepenik/dp/B0FLDCGC5D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-lg transition-all duration-200 text-center hover:scale-105 transform"
            >
              Get the Coloring Book
            </a>
            <p className="text-xs text-gray-400 mt-4 text-center italic">
              Part of the proceeds support ongoing development
            </p>
          </motion.div>

          {/* Direct Support */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border border-red-500/30 rounded-xl p-8 hover:border-red-500/50 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-8 w-8 text-red-400" />
              <h3 className="text-2xl font-bold text-white">Direct Support</h3>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              If this mortgage calculator saved you time or helped you make a better financial decision, consider a direct contribution. Every bit helps fund new features and tools.
            </p>
            <ul className="space-y-2 mb-6 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-red-400">✓</span>
                <span>Fund new calculator features</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-400">✓</span>
                <span>Support ongoing development</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-400">✓</span>
                <span>Help build more financial tools</span>
              </li>
            </ul>
            <a
              href="https://buymeacoffee.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold rounded-lg transition-all duration-200 text-center hover:scale-105 transform"
            >
              Support My Work
            </a>
            <p className="text-xs text-gray-400 mt-4 text-center italic">
              100% goes toward keeping these projects free and ad&apos;free
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 p-6 bg-gray-800/50 border border-gray-700/50 rounded-lg text-center"
        >
          <p className="text-gray-300 text-sm">
            Whether you grab the coloring book for your family or support development directly—
            <span className="text-orange-400 font-semibold"> thank you for believing in building better financial tools</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SupportSection;