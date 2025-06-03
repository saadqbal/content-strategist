"use client";
import { useState } from "react";
import UploadTopics from "../components/UploadTopics";
import UploadCompetitors from "../components/UploadCompetitors";
import ThemeSlugs from "@/components/ThemeSlugs";
import Ideas from "@/components/Ideas";

export default function Home() {
  const [ideas, setIdeas] = useState<any[]>([]);
  return (
    <main className="container">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          Content Strategist Assistant
        </h1>
        <p className="text-lg text-gray-600">
          Upload your topics and get AI-powered content recommendations
        </p>
      </div>

      <div className="bg-white rounded shadow p-6 mb-8 flex flex-row gap-4 justify-center">
        <UploadTopics />
        <UploadCompetitors />
      </div>

      <ThemeSlugs onGetRecommendations={setIdeas} />

      {ideas.length > 0 && (
        <Ideas ideas={ideas} />
      )}
    </main>
  );
}
