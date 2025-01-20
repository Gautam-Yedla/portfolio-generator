import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeStatus = localStorage.getItem("darkMode");
    if (darkModeStatus === "true") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);
  

  const toggleTheme = () => {
    const newDarkModeStatus = !isDarkMode;
    setIsDarkMode(newDarkModeStatus);
    if (newDarkModeStatus) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition duration-500">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/">
          <span className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer hover:text-blue-800 transition duration-300">
            Portfolio Generator
          </span>
        </Link>
        <div className="hidden sm:flex items-center space-x-8">
          <Link href="/edit">
            <span className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300 cursor-pointer">
              Edit
            </span>
          </Link>
          <Link href="/preview">
            <span className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300 cursor-pointer">
              Preview
            </span>
          </Link>
          <button
            onClick={toggleTheme}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition duration-300 ${
              isDarkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-400 dark:hover:bg-blue-500"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
            }`}
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            ☰
          </button>
        </div>
      </nav>
      {isNavOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-900 px-6 py-4 space-y-4">
          <Link href="/edit">
            <span className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Edit
            </span>
          </Link>
          <Link href="/preview">
            <span className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Preview
            </span>
          </Link>
          <button
            onClick={toggleTheme}
            className="block bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-600 w-full text-center"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      )}
    </header>
  );
}
