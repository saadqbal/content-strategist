import React, { useState } from 'react';

interface UploadCompetitorsProps {
  onUploadSuccess?: () => void;
}

const UploadCompetitors: React.FC<UploadCompetitorsProps> = ({ onUploadSuccess }) => {
  const [competitorsData, setCompetitorsData] = useState<string>('');
  const [competitorsFileName, setCompetitorsFileName] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleCompetitorsUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCompetitorsFileName(file.name);
    const text = await file.text();
    setCompetitorsData(text);
  };

  const sendToServer = async () => {
    if (!competitorsData) return;
    setLoading(true);
    try {
      await fetch('/api/upload-competitors', {
        method: 'POST',
        body: JSON.stringify({ competitors: competitorsData }),
        headers: { 'Content-Type': 'application/json' },
      });
      onUploadSuccess?.();
      alert('Uploaded competitors successfully!');
    } catch (error) {
      console.error('Error uploading competitors:', error);
      alert('Failed to upload competitors. Please try again.');
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
          onChange={handleCompetitorsUpload}
          className="hidden"
          id="competitors-upload"
        />
        <label
          htmlFor="competitors-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <svg className="w-12 h-12 text-gray-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span className="text-sm text-gray-600">Click to upload CSV file</span>
          <span className="text-xs text-gray-500 mt-1">or drag and drop</span>
        </label>
        {competitorsFileName && (
          <div className="mt-4 text-sm text-gray-600">
            Selected file: <span className="font-medium">{competitorsFileName}</span>
          </div>
        )}
      </div>

      <button
        onClick={sendToServer}
        disabled={!competitorsData || loading}
        className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Uploading...' : 'Upload Competitors'}
      </button>
    </div>
  );
};

export default UploadCompetitors; 