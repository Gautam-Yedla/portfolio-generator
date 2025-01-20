import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import api from "../utils/api"; // Axios instance

export default function Home() {
  const [file, setFile] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      setUploadStatus("Please select a file to upload.");
      return;
    }

    setIsGenerating(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/file/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadStatus("File uploaded successfully!");
      console.log("File Path:", response.data.file_path);
      alert("Portfolio generated successfully!");
    } catch (error) {
      console.error(error);
      setUploadStatus("Failed to upload and generate portfolio.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12 flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-6 text-gray-800 dark:text-gray-100 leading-tight animate-fadeIn">
          <span className="animate-typewriter">Create Your Professional Portfolio</span> <br />
          <span className="text-blue-600 dark:text-blue-400">In Seconds</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
          Upload your resume and let our AI transform it into a professional portfolio website.
        </p>
        <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 w-full max-w-md animate-slideUp">
          <label htmlFor="file-upload" className="block text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
            Upload Your Resume
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          {file && <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Selected File: {file.name}</p>}
          <button
            onClick={handleSubmit}
            className={`w-full ${
              isGenerating
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            } text-white font-bold py-3 rounded-lg transition transform hover:scale-105`}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Upload and Generate"}
          </button>
          {uploadStatus && <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{uploadStatus}</p>}
        </div>
      </main>
      <Footer />
    </div>
  );
}
