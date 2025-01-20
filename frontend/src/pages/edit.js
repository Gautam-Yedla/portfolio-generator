import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import api from "../utils/api";

export default function Edit() {
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleGenerateContent = async () => {
    if (!prompt) {
      alert("Please enter a prompt!");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await api.post("/ai/generate", { prompt });
      setGeneratedContent(response.data.generated_content);
    } catch (error) {
      console.error(error);
      alert("Failed to generate content.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await api.post("/database/save", {
        section: "About",
        content: generatedContent,
      });
      setStatusMessage(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Failed to save content.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12 flex flex-col items-center text-center animate-fadeIn">
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-6 text-gray-800 dark:text-gray-100 leading-tight">
          Edit Your Portfolio <br />
          <span className="text-blue-600 dark:text-blue-400 animate-pulse">Make It Yours</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
          Update your portfolio sections and save changes instantly.
        </p>
        <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 w-full max-w-md animate-slideUp">
          <textarea
            className="w-full h-32 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="Enter a prompt for AI..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <button
            onClick={handleGenerateContent}
            className={`w-full ${
              isGenerating
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            } text-white font-bold py-3 rounded-lg transition transform hover:scale-105 mb-4`}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate Content"}
          </button>
          {generatedContent && (
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-inner mb-4">
              <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">Generated Content:</h3>
              <p className="text-gray-700 dark:text-gray-300">{generatedContent}</p>
            </div>
          )}
          <button
            onClick={handleSave}
            className={`w-full ${
              isSaving
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            } text-white font-bold py-3 rounded-lg transition transform hover:scale-105`}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
          {statusMessage && <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{statusMessage}</p>}
        </div>
      </main>
      <Footer />
    </div>
  );
}
