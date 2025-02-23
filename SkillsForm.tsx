import React from 'react';
import { Wrench, Globe, Brain, Plus, Trash2 } from 'lucide-react';
import { ResumeData } from '../types/resume';

interface SkillsFormProps {
  skills: ResumeData['skills'];
  onChange: (skills: ResumeData['skills']) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ skills, onChange }) => {
  const handleAdd = (category: keyof ResumeData['skills']) => {
    onChange({
      ...skills,
      [category]: [...skills[category], ''],
    });
  };

  const handleRemove = (category: keyof ResumeData['skills'], index: number) => {
    onChange({
      ...skills,
      [category]: skills[category].filter((_, i) => i !== index),
    });
  };

  const handleChange = (category: keyof ResumeData['skills'], index: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSkills = { ...skills };
    newSkills[category][index] = e.target.value;
    onChange(newSkills);
  };

  const renderSkillSection = (
    category: keyof ResumeData['skills'],
    icon: React.ReactNode,
    title: string,
    placeholder: string
  ) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {icon}
          <h3 className="font-semibold">{title}</h3>
        </div>
        <button
          onClick={() => handleAdd(category)}
          className="text-blue-500 hover:text-blue-700"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      {skills[category].map((skill, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder={placeholder}
            value={skill}
            onChange={handleChange(category, index)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleRemove(category, index)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
      
      {renderSkillSection(
        'technical',
        <Wrench className="w-5 h-5 text-gray-500" />,
        'Technical Skills',
        'e.g., JavaScript, React, Node.js'
      )}

      {renderSkillSection(
        'languages',
        <Globe className="w-5 h-5 text-gray-500" />,
        'Languages',
        'e.g., English, Spanish'
      )}

      {renderSkillSection(
        'soft',
        <Brain className="w-5 h-5 text-gray-500" />,
        'Soft Skills',
        'e.g., Leadership, Communication'
      )}
    </div>
  );
};