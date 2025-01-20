export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-700 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm sm:text-base">
          &copy; 2025{" "}
          <span className="font-bold text-blue-400 hover:text-blue-600 transition duration-300 cursor-pointer">
            Portfolio Generator
          </span>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
