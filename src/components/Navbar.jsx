import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "EVENTS", path: "/events" },
    { name: "BLOG", path: "/blog" },
    { name: "SOCIETIES", path: "/societies" },
    { name: "TEAM", path: "/team" },
    { name: "CONTACT", path: "/contact" },
  ];

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <nav className="fixed w-full bg-white/90 dark:bg-ieee-dark/90 backdrop-blur-sm z-50 transition-colors duration-300 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0">
            <motion.span
              className="text-ieee-blue dark:text-white font-display font-bold text-xl"
              whileHover={{ scale: 1.05 }}
            >
              IEEE SB MUJ
            </motion.span>
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? "text-ieee-blue dark:text-white bg-gray-100 dark:bg-gray-800"
                      : "text-gray-700 dark:text-gray-300 hover:text-ieee-blue dark:hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-ieee-blue" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block bg-ieee-blue text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              JOIN NOW
            </motion.button>

            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6 text-ieee-blue dark:text-white" />
              ) : (
                <Menu className="h-6 w-6 text-ieee-blue dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-ieee-dark border-t border-gray-200 dark:border-gray-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.path
                      ? "text-ieee-blue dark:text-white bg-gray-100 dark:bg-gray-800"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-4 bg-ieee-blue text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                JOIN NOW
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
