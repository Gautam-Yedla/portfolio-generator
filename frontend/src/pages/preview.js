import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import api from "../utils/api";

export default function Preview() {
  const [edits, setEdits] = useState([]);

  useEffect(() => {
    fetchEdits();
  }, []);

  const fetchEdits = async () => {
    try {
      const response = await api.get("/database/fetch");
      setEdits(response.data.edits);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch edits.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12 flex flex-col items-center text-center animate-fadeIn">
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-6 text-gray-800 dark:text-gray-100 leading-tight">
          Preview Your Portfolio <br />
          <span className="text-blue-600 dark:text-blue-400 animate-pulse">See It in Action</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
          Take a look at your live portfolio before sharing it with the world.
        </p>
        <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 w-full max-w-lg animate-slideUp">
          {edits.length > 0 ? (
            edits.map((edit, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">{edit.section}</h3>
                <p className="text-gray-700 dark:text-gray-300">{edit.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-700 dark:text-gray-300">No edits found.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
