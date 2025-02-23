import React from 'react';
import { FileText, Mail, Phone, MapPin, Calendar, Linkedin, Github, Globe } from 'lucide-react';

interface PersonalInfoFormProps {
  data: {
    name: string;
    email: string;
    phone: string;
    address: string;
    dateOfBirth: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  onChange: (data: any) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange }) => {
  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...data, [field]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Full Name"
            value={data.name}
            onChange={handleChange('name')}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Mail className="w-5 h-5 text-gray-500" />
          <input
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange('email')}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="w-5 h-5 text-gray-500" />
          <input
            type="tel"
            placeholder="Phone"
            value={data.phone}
            onChange={handleChange('phone')}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Address"
            value={data.address}
            onChange={handleChange('address')}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <input
            type="date"
            placeholder="Date of Birth"
            value={data.dateOfBirth}
            onChange={handleChange('dateOfBirth')}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Linkedin className="w-5 h-5 text-gray-500" />
          <input
            type="url"
            placeholder="LinkedIn URL"
            value={data.linkedin}
            onChange={handleChange('linkedin')}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Github className="w-5 h-5 text-gray-500" />
          <input
            type="url"
            placeholder="GitHub URL"
            value={data.github}
            onChange={handleChange('github')}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-gray-500" />
          <input
            type="url"
            placeholder="Portfolio URL"
            value={data.portfolio}
            onChange={handleChange('portfolio')}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};