import React, { useState } from 'react';
import { useSchool } from '../../hooks/useSchool';
import { Settings, LayoutTemplate, Calculator, CheckCircle2, Save, Users, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { GradeRange } from '../../types';
import { db } from '../../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default function AcademicSettingsPage() {
  const { school } = useSchool();
  const [activeTab, setActiveTab] = useState<'templates' | 'grading' | 'classes'>('templates');
  const [selectedTheme, setSelectedTheme] = useState('nigerian-standard');

  const themes = [
    { id: 'nigerian-standard', name: 'Nigerian Standard', desc: 'Traditional layout with psychomotor & affective domains.' },
    { id: 'international-modern', name: 'International Modern', desc: 'Sleek, global aesthetic focusing on core competencies.' },
    { id: 'elite-private', name: 'Elite Private', desc: 'Premium, luxurious design with detailed analytics.' },
    { id: 'minimalist', name: 'Minimalist', desc: 'Clean, data-focused layout without distractions.' },
    { id: 'creche-observational', name: 'Creche / Early Years', desc: 'Specialized layout for observational metrics only.' },
  ];

  const [gradingScale, setGradingScale] = useState<GradeRange[]>([
    { label: 'A1', min: 75, max: 100, remark: 'Excellent' },
    { label: 'B2', min: 70, max: 74, remark: 'Very Good' },
    { label: 'B3', min: 65, max: 69, remark: 'Good' },
    { label: 'C4', min: 60, max: 64, remark: 'Credit' },
    { label: 'C5', min: 55, max: 59, remark: 'Credit' },
    { label: 'C6', min: 50, max: 54, remark: 'Credit' },
    { label: 'D7', min: 45, max: 49, remark: 'Pass' },
    { label: 'E8', min: 40, max: 44, remark: 'Pass' },
    { label: 'F9', min: 0, max: 39, remark: 'Fail' },
  ]);

  const [classesConfig, setClassesConfig] = useState([
    { id: '1', name: 'JSS 1', usePositions: false, assessmentType: 'numerical' },
    { id: '2', name: 'SSS 1', usePositions: true, assessmentType: 'numerical' },
    { id: '3', name: 'Creche', usePositions: false, assessmentType: 'observational' },
  ]);

  const toggleClassPosition = (id: string) => {
    setClassesConfig(classesConfig.map(c => c.id === id ? { ...c, usePositions: !c.usePositions } : c));
  };

  const changeAssessmentType = (id: string, type: 'numerical' | 'observational') => {
    setClassesConfig(classesConfig.map(c => c.id === id ? { ...c, assessmentType: type } : c));
  };
  const handleSave = async () => {
    if (!school?.id) return;
    try {
      await updateDoc(doc(db, 'schools', school.id), {
        settings: {
          reportCardTheme: selectedTheme,
          gradingSystem: gradingScale,
        }
      });
      alert('Academic Configuration Saved Successfully');
    } catch (err) {
      alert('Failed to save configuration');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-white shadow-xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-sans font-extrabold mb-2 flex items-center gap-3">
              <Settings className="w-8 h-8 text-slate-400" />
              Academic Settings
            </h1>
            <p className="text-slate-300 font-medium">Configure grading scales, report templates, and class behaviors.</p>
          </div>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-emerald-500 transition-all w-fit"
          >
            <Save className="w-5 h-5" />
            Save Configuration
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <div className="lg:w-64 shrink-0 flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('templates')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'templates' ? 'bg-slate-800 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <LayoutTemplate className="w-5 h-5" /> Template Studio
          </button>
          <button 
            onClick={() => setActiveTab('grading')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'grading' ? 'bg-slate-800 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <Calculator className="w-5 h-5" /> Grading Engine
          </button>
          <button 
            onClick={() => setActiveTab('classes')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'classes' ? 'bg-slate-800 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <Users className="w-5 h-5" /> Class Behaviors
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 min-h-[500px]">
          
          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">Report Card Templates</h2>
                <p className="text-gray-500 mb-8">Select the visual layout for your school's generated report cards.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {themes.map((theme) => (
                  <div 
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`relative rounded-2xl p-6 border-2 cursor-pointer transition-all ${
                      selectedTheme === theme.id 
                      ? 'border-indigo-600 bg-indigo-50/50 shadow-md scale-[1.02]' 
                      : 'border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    {selectedTheme === theme.id && (
                      <div className="absolute top-4 right-4 text-indigo-600">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                    )}
                    <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${selectedTheme === theme.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                      <LayoutTemplate className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{theme.name}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{theme.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'grading' && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-2">WAEC Standard Grading</h2>
                  <p className="text-gray-500 max-w-xl">
                    Configure the grade bands used for numerical assessments. These defaults are based on the West African Examinations Council standard.
                  </p>
                </div>
                <button className="text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors">
                  Reset to Default
                </button>
              </div>

              <div className="overflow-x-auto mt-8 border border-gray-100 rounded-2xl shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-widest">
                    <tr>
                      <th className="p-4 font-bold">Grade</th>
                      <th className="p-4 font-bold">Min Score</th>
                      <th className="p-4 font-bold">Max Score</th>
                      <th className="p-4 font-bold">Remark</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {gradingScale.map((scale, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-black text-gray-900 text-lg">{scale.label}</td>
                        <td className="p-4">
                          <input type="number" defaultValue={scale.min} className="w-20 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 focus:ring-2 focus:ring-indigo-500" />
                        </td>
                        <td className="p-4">
                          <input type="number" defaultValue={scale.max} className="w-20 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 focus:ring-2 focus:ring-indigo-500" />
                        </td>
                        <td className="p-4">
                          <input type="text" defaultValue={scale.remark} className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 focus:ring-2 focus:ring-indigo-500" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'classes' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">Class Granularity Settings</h2>
                <p className="text-gray-500 mb-8">Toggle positioning (1st, 2nd, 3rd) and set assessment types (Exams vs Observation) for specific classes.</p>
              </div>

              <div className="space-y-4">
                {classesConfig.map(cls => (
                  <div key={cls.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border border-gray-100 rounded-2xl hover:border-gray-200 transition-all bg-gray-50/30">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{cls.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        {cls.assessmentType === 'observational' ? (
                          <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                            Observational Only
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md font-bold">
                            Numerical Grading
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 mt-4 sm:mt-0">
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Show Positions</span>
                        <button 
                          onClick={() => toggleClassPosition(cls.id)}
                          className={`w-12 h-6 rounded-full transition-colors relative ${cls.usePositions ? 'bg-indigo-500' : 'bg-gray-200'}`}
                        >
                          <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${cls.usePositions ? 'left-7' : 'left-1'}`} />
                        </button>
                      </div>

                      <div className="w-px h-10 bg-gray-200 hidden sm:block" />

                      <div>
                         <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Assessment</span>
                         <select 
                           value={cls.assessmentType}
                           onChange={(e) => changeAssessmentType(cls.id, e.target.value as any)}
                           className="text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                         >
                           <option value="numerical">Numerical</option>
                           <option value="observational">Observational</option>
                         </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-4 text-amber-800">
                <AlertCircle className="w-6 h-6 shrink-0 mt-0.5 text-amber-600" />
                <div>
                  <h4 className="font-bold mb-1 text-amber-900">Creche / Pre-School Notice</h4>
                  <p className="text-sm">Classes set to "Observational" will not use the standard CA/Exam mark sheets. Teachers will instead evaluate students using the "Consistently / Sometimes / Rarely" behavioral metric scale.</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
