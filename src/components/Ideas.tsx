import React, { useState } from 'react';

interface IdeasProps {
  ideas: any[];
}

const Ideas: React.FC<IdeasProps> = ({ ideas }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Top Content Ideas</h2>
      <div className="table-container">
        <table className="content-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {ideas.map((idea, i) => (
              <tr key={i}>
                <td className="table-title">{i + 1}</td>
                <td className="table-title">{idea.title}</td>
                <td className="table-slug">{idea.slug}</td>
                <td className="table-reason">{idea.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ideas;