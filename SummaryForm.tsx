import React from 'react';
import { FileText } from 'lucide-react';

interface SummaryFormProps {
  summary: string;
  onChange: (summary: string) => void;
}

export const SummaryForm: React.FC<SummaryFormProps> = ({ summary, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <FileText className="w-5 h-5 text-gray-500" />
        <h2 className="text-2xl font-bold text-gray-800">Professional Summary</h2>
      </div>
      <textarea
        value={summary}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write a brief summary of your professional background and career objectives..."
        className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 h-48"
      />
      <p className="text-sm text-gray-500">
        Tip: Keep your summary concise and focused on your key strengths and career goals.
      </p>
    </div>
  );
};