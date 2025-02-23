import React from 'react';
import { Award, Calendar, Link, Plus, Trash2 } from 'lucide-react';
import { Certification } from '../types/resume';

interface CertificationsFormProps {
  certifications: Certification[];
  onChange: (certifications: Certification[]) => void;
}

export const CertificationsForm: React.FC<CertificationsFormProps> = ({
  certifications,
  onChange,
}) => {
  const handleAdd = () => {
    onChange([...certifications, { name: '', issuer: '', date: '', url: '' }]);
  };

  const handleRemove = (index: number) => {
    onChange(certifications.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof Certification) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newCertifications = [...certifications];
    newCertifications[index] = { ...newCertifications[index], [field]: e.target.value };
    onChange(newCertifications);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Certifications</h2>
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certification</span>
        </button>
      </div>

      {certifications.map((cert, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4 bg-gray-50">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">Certification #{index + 1}</h3>
            <button
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Certification Name"
                value={cert.name}
                onChange={handleChange(index, 'name')}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Issuing Organization"
                value={cert.issuer}
                onChange={handleChange(index, 'issuer')}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <input
                type="date"
                placeholder="Date"
                value={cert.date}
                onChange={handleChange(index, 'date')}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Link className="w-5 h-5 text-gray-500" />
              <input
                type="url"
                placeholder="Certification URL (optional)"
                value={cert.url}
                onChange={handleChange(index, 'url')}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};