import React, { useState } from 'react';

interface ThemeSlugsProps {
  onGetRecommendations: (ideas: any[]) => void;
}

const ThemeSlugs: React.FC<ThemeSlugsProps> = ({ onGetRecommendations }) => {
  const [theme, setTheme] = useState('');
  const [loading, setLoading] = useState(false);

  const getRecommendations = async () => {
    if (!theme) return;
    setLoading(true);
    const res = await fetch(`/api/recommend-content?themeSlug=${theme}`);
    const data = await res.json();
    onGetRecommendations(data.ideas);
    setLoading(false);
  };
  

  return (
    <>  
    <div className="bg-white rounded shadow p-6 mb-8">
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Theme Slugs</label>
            <textarea
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="input"
              placeholder="comma separated list of theme slugs, e.g., digital-marketing, affiliate, brand"
            />
          </div>

          <button
            onClick={getRecommendations}
            disabled={!theme}
            className="btn btn-success w-full"
          >
            Get Recommendations
          </button>
        </div>
      </div>
      {loading && (
      <div className="flex justify-center items-center py-8">
        <div className="spinner"></div>
      </div>
    )}
    </>
  );
};

export default ThemeSlugs;