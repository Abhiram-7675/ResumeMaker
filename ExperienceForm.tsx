import React from 'react';
import { Briefcase, Calendar, Plus, Trash2 } from 'lucide-react';
import { Experience } from '../types/resume';

interface ExperienceFormProps {
  experience: Experience[];
  onChange: (experience: Experience[]) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ experience, onChange }) => {
  const handleAdd = () => {
    onChange([
      ...experience,
      { company: '', position: '', startDate: '', endDate: '', description: '', achievements: [] },
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(experience.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof Experience) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newExperience = [...experience];
    newExperience[index] = { ...newExperience[index], [field]: e.target.value };
    onChange(newExperience);
  };

  const handleAchievementAdd = (index: number) => {
    const newExperience = [...experience];
    newExperience[index].achievements.push('');
    onChange(newExperience);
  };

  const handleAchievementChange = (expIndex: number, achievementIndex: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newExperience = [...experience];
    newExperience[expIndex].achievements[achievementIndex] = e.target.value;
    onChange(newExperience);
  };

  const handleAchievementRemove = (expIndex: number, achievementIndex: number) => {
    const newExperience = [...experience];
    newExperience[expIndex].achievements.splice(achievementIndex, 1);
    onChange(newExperience);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Work Experience</h2>
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {experience.map((exp, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4 bg-gray-50">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">Experience #{index + 1}</h3>
            <button
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={handleChange(index, 'company')}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Position"
                value={exp.position}
                onChange={handleChange(index, 'position')}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <input
                type="date"
                placeholder="Start Date"
                value={exp.startDate}
                onChange={handleChange(index, 'startDate')}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <input
                type="date"
                placeholder="End Date"
                value={exp.endDate}
                onChange={handleChange(index, 'endDate')}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="col-span-2">
            <textarea
              placeholder="Job Description"
              value={exp.description}
              onChange={handleChange(index, 'description')}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 h-24"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Key Achievements</h4>
              <button
                onClick={() => handleAchievementAdd(index)}
                className="text-blue-500 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {exp.achievements.map((achievement, achievementIndex) => (
              <div key={achievementIndex} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Achievement"
                  value={achievement}
                  onChange={handleAchievementChange(index, achievementIndex)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleAchievementRemove(index, achievementIndex)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};