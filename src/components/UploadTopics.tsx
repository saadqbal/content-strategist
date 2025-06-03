import React, { useState } from 'react';

interface UploadTopicsProps {
  onUploadSuccess?: () => void;
}

const UploadTopics: React.FC<UploadTopicsProps> = ({ onUploadSuccess }) => {
  const [topicsData, setTopicsData] = useState<string>('');
  const [topicsFileName, setTopicsFileName] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleTopicsUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setTopicsFileName(file.name);
    const text = await file.text();
    setTopicsData(text);
  };

  const sendToServer = async () => {
    if (!topicsData) return;
    setLoading(true);
    try {
      await fetch('/api/upload-topics', {
        method: 'POST',
        body: JSON.stringify({ topics: topicsData }),
        headers: { 'Content-Type': 'application/json' },
      });
      onUploadSuccess?.();
      alert('Uploaded topics successfully!');
    } catch (error) {
      console.error('Error uploading topics:', error);
      alert('Failed to upload topics. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="h-40 border-2 border-dashed border-gray-300 rounded p-6 text-center">
        <input
          type="file"
          accept=".csv"
          onChange={handleTopicsUpload}
          className="hidden"
          id="topics-upload"
        />
        <label
          htmlFor="topics-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <svg className="w-12 h-12 text-gray-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span className="text-sm text-gray-600">Click to upload CSV file</span>
          <span className="text-xs text-gray-500 mt-1">or drag and drop</span>
        </label>
        {topicsFileName && (
          <div className="mt-4 text-sm text-gray-600">
            Selected file: <span className="font-medium">{topicsFileName}</span>
          </div>
        )}
      </div>

      <button
        onClick={sendToServer}
        disabled={!topicsData || loading}
        className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Uploading...' : 'Upload Topics'}
      </button>
    </div>
  );
};

export default UploadTopics;