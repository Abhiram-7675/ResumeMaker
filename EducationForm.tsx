import React from 'react';
import { GraduationCap, Calendar, Plus, Trash2 } from 'lucide-react';
import { Education } from '../types/resume';

interface EducationFormProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ education, onChange }) => {
  const handleAdd = () => {
    onChange([
      ...education,
      { institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' },
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(education.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof Education) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [field]: e.target.value };
    onChange(newEducation);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Education</h2>
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      {education.map((edu, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4 bg-gray-50">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">Education #{index + 1}</h3>
            <button
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Institution"
                value={edu.institution}
                onChange={handleChange(index, 'institution')}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={handleChange(index, 'degree')}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Field of Study"
                value={edu.field}
                onChange={handleChange(index, 'field')}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="GPA (optional)"
                value={edu.gpa}
                onChange={handleChange(index, 'gpa')}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <input
                type="date"
                placeholder="Start Date"
                value={edu.startDate}
                onChange={handleChange(index, 'startDate')}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <input
                type="date"
                placeholder="End Date"
                value={edu.endDate}
                onChange={handleChange(index, 'endDate')}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};