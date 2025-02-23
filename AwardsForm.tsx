import React from 'react';
import { Trophy, Calendar, Plus, Trash2 } from 'lucide-react';
import { Award } from '../types/resume';

interface AwardsFormProps {
  awards: Award[];
  onChange: (awards: Award[]) => void;
}

export const AwardsForm: React.FC<AwardsFormProps> = ({ awards, onChange }) => {
  const handleAdd = () => {
    onChange([...awards, { title: '', issuer: '', date: '', description: '' }]);
  };

  const handleRemove = (index: number) => {
    onChange(awards.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof Award) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newAwards = [...awards];
    newAwards[index] = { ...newAwards[index], [field]: e.target.value };
    onChange(newAwards);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Awards & Achievements</h2>
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" />
          <span>Add Award</span>
        </button>
      </div>

      {awards.map((award, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4 bg-gray-50">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">Award #{index + 1}</h3>
            <button
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Award Title"
                value={award.title}
                onChange={handleChange(index, 'title')}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Issuing Organization"
                value={award.issuer}
                onChange={handleChange(index, 'issuer')}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <input
                type="date"
                placeholder="Date"
                value={award.date}
                onChange={handleChange(index, 'date')}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="col-span-2">
            <textarea
              placeholder="Award Description"
              value={award.description}
              onChange={handleChange(index, 'description')}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 h-24"
            />
          </div>
        </div>
      ))}
    </div>
  );
};