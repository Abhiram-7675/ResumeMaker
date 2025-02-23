import React, { useState, useEffect } from 'react';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { SummaryForm } from './components/SummaryForm';
import { EducationForm } from './components/EducationForm';
import { ExperienceForm } from './components/ExperienceForm';
import { SkillsForm } from './components/SkillsForm';
import { CertificationsForm } from './components/CertificationsForm';
import { AwardsForm } from './components/AwardsForm';
import { FileDown, Eye, Settings, Palette, Save, Loader2, Menu, X } from 'lucide-react';
import { ResumeData } from './types/resume';
import { exportToPDF, exportToWord } from './utils/exportUtils';

const initialData: ResumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    linkedin: '',
    github: '',
    portfolio: '',
  },
  summary: '',
  education: [],
  experience: [],
  skills: {
    technical: [],
    languages: [],
    soft: [],
  },
  certifications: [],
  awards: [],
};

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('resumeData');
    return saved ? JSON.parse(saved) : initialData;
  });
  const [activeSection, setActiveSection] = useState('personal');
  const [isExporting, setIsExporting] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const saveData = async () => {
      try {
        setSaveStatus('saving');
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
        setLastSaved(new Date());
        setSaveStatus('saved');
      } catch (error) {
        setSaveStatus('error');
        console.error('Error saving data:', error);
      }
    };

    const timeoutId = setTimeout(saveData, 1000);
    return () => clearTimeout(timeoutId);
  }, [resumeData]);

  const handlePersonalInfoChange = (personalInfo: ResumeData['personalInfo']) => {
    setResumeData(prev => ({ ...prev, personalInfo }));
  };

  const handleSummaryChange = (summary: string) => {
    setResumeData(prev => ({ ...prev, summary }));
  };

  const handleEducationChange = (education: ResumeData['education']) => {
    setResumeData(prev => ({ ...prev, education }));
  };

  const handleExperienceChange = (experience: ResumeData['experience']) => {
    setResumeData(prev => ({ ...prev, experience }));
  };

  const handleSkillsChange = (skills: ResumeData['skills']) => {
    setResumeData(prev => ({ ...prev, skills }));
  };

  const handleCertificationsChange = (certifications: ResumeData['certifications']) => {
    setResumeData(prev => ({ ...prev, certifications }));
  };

  const handleAwardsChange = (awards: ResumeData['awards']) => {
    setResumeData(prev => ({ ...prev, awards }));
  };

  const handleExport = async (format: 'pdf' | 'word') => {
    setIsExporting(true);
    try {
      if (format === 'pdf') {
        await exportToPDF(resumeData);
      } else {
        await exportToWord(resumeData);
      }
    } catch (error) {
      console.error('Error exporting resume:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const progressPercentage = (() => {
    let total = 0;
    let filled = 0;

    const requiredPersonalFields = ['name', 'email', 'phone', 'address'];
    total += requiredPersonalFields.length;
    filled += requiredPersonalFields.filter(field => 
      Boolean(resumeData.personalInfo[field as keyof typeof resumeData.personalInfo])
    ).length;

    total += 1;
    filled += resumeData.summary ? 1 : 0;

    const requiredEduFields = ['institution', 'degree', 'field', 'startDate', 'endDate'];
    total += resumeData.education.length * requiredEduFields.length;
    filled += resumeData.education.reduce((acc, edu) => {
      return acc + requiredEduFields.filter(field => 
        Boolean(edu[field as keyof typeof edu])
      ).length;
    }, 0);

    const requiredExpFields = ['company', 'position', 'startDate', 'endDate', 'description'];
    total += resumeData.experience.length * requiredExpFields.length;
    filled += resumeData.experience.reduce((acc, exp) => {
      return acc + requiredExpFields.filter(field => 
        Boolean(exp[field as keyof typeof exp])
      ).length;
    }, 0);

    const skillCategories = ['technical', 'languages', 'soft'];
    total += skillCategories.length;
    filled += skillCategories.filter(category => 
      resumeData.skills[category as keyof typeof resumeData.skills].length > 0
    ).length;

    return Math.min(Math.round((filled / Math.max(total, 1)) * 100), 100);
  })();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-green-600">
      <div className="min-h-screen backdrop-blur-xl bg-white/10">
        {/* Header */}
        <header className="bg-white/20 backdrop-blur-lg border-b border-white/20 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                  Quick<span className="text-emerald-200">CV</span>
                </h1>
                <p className="text-white/90 mt-1 text-sm sm:text-base">Create Your Professional Resume</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm hidden sm:block">
                  {saveStatus === 'saving' && (
                    <div className="flex items-center text-white">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </div>
                  )}
                  {saveStatus === 'saved' && lastSaved && (
                    <div className="flex items-center text-emerald-200">
                      <Save className="w-4 h-4 mr-2" />
                      Saved at {lastSaved.toLocaleTimeString()}
                    </div>
                  )}
                </div>
                <button
                  onClick={toggleSidebar}
                  className="lg:hidden text-white hover:text-emerald-200"
                >
                  {isSidebarOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-white">Resume completion</span>
                <span className="text-sm font-medium text-white">{progressPercentage}%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-200 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Sidebar for mobile */}
            <div
              className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden ${
                isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              onClick={toggleSidebar}
            />

            {/* Sidebar */}
            <div
              className={`fixed lg:relative inset-y-0 left-0 z-30 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:transform-none lg:col-span-3 ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
              } lg:translate-x-0`}
            >
              <div className="h-full overflow-y-auto">
                <nav className="space-y-1">
                  {[
                    { id: 'personal', label: 'Personal Info', icon: Settings },
                    { id: 'summary', label: 'Summary', icon: FileDown },
                    { id: 'education', label: 'Education', icon: Settings },
                    { id: 'experience', label: 'Experience', icon: Settings },
                    { id: 'skills', label: 'Skills', icon: Settings },
                    { id: 'certifications', label: 'Certifications', icon: Settings },
                    { id: 'awards', label: 'Awards', icon: Settings },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSectionChange(item.id)}
                      className={`w-full flex items-center px-4 py-3.5 text-sm transition-all duration-200 ${
                        activeSection === item.id
                          ? 'bg-emerald-500 text-white'
                          : 'text-gray-700 hover:bg-emerald-50'
                      }`}
                    >
                      <item.icon className={`w-4 h-4 mr-3 ${
                        activeSection === item.id ? 'text-white' : 'text-emerald-500'
                      }`} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </nav>

                <div className="p-4 space-y-4">
                  <h3 className="text-sm font-semibold text-gray-800">Export Resume</h3>
                  <button
                    onClick={() => handleExport('pdf')}
                    disabled={isExporting}
                    className="w-full flex items-center justify-center px-4 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 disabled:opacity-50 transition-colors duration-200"
                  >
                    {isExporting ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <FileDown className="w-4 h-4 mr-2" />
                    )}
                    <span className="font-medium">Export as PDF</span>
                  </button>
                  <button
                    onClick={() => handleExport('word')}
                    disabled={isExporting}
                    className="w-full flex items-center justify-center px-4 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-colors duration-200"
                  >
                    {isExporting ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <FileDown className="w-4 h-4 mr-2" />
                    )}
                    <span className="font-medium">Export as Word</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="mt-8 lg:mt-0 lg:col-span-9">
              <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
                {activeSection === 'personal' && (
                  <PersonalInfoForm
                    data={resumeData.personalInfo}
                    onChange={handlePersonalInfoChange}
                  />
                )}
                {activeSection === 'summary' && (
                  <SummaryForm
                    summary={resumeData.summary}
                    onChange={handleSummaryChange}
                  />
                )}
                {activeSection === 'education' && (
                  <EducationForm
                    education={resumeData.education}
                    onChange={handleEducationChange}
                  />
                )}
                {activeSection === 'experience' && (
                  <ExperienceForm
                    experience={resumeData.experience}
                    onChange={handleExperienceChange}
                  />
                )}
                {activeSection === 'skills' && (
                  <SkillsForm
                    skills={resumeData.skills}
                    onChange={handleSkillsChange}
                  />
                )}
                {activeSection === 'certifications' && (
                  <CertificationsForm
                    certifications={resumeData.certifications}
                    onChange={handleCertificationsChange}
                  />
                )}
                {activeSection === 'awards' && (
                  <AwardsForm
                    awards={resumeData.awards}
                    onChange={handleAwardsChange}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;