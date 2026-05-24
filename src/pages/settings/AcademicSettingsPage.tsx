import React, { useState, useEffect } from 'react';
import { useSchool } from '../../hooks/useSchool';
import { Settings, LayoutTemplate, Calculator, CheckCircle2, Save, Users, AlertCircle, Loader2, Plus, X, ListOrdered } from 'lucide-react';
import { GradeRange, Class, AssessmentColumn } from '../../types';
import { db } from '../../lib/firebase';
import { doc, updateDoc, onSnapshot, collection } from 'firebase/firestore';

export default function AcademicSettingsPage() {
  const { school } = useSchool();
  const [activeTab, setActiveTab] = useState<'templates' | 'grading' | 'assessments' | 'classes'>('templates');
  const [selectedTheme, setSelectedTheme] = useState(school?.settings?.reportCardTheme || 'standard');
  const [reportCardColors, setReportCardColors] = useState(school?.settings?.reportCardColors || { primary: '#4f46e5', secondary: '#9333ea' });
  const [reportCardFont, setReportCardFont] = useState(school?.settings?.reportCardFont || 'Inter');
  const [classesConfig, setClassesConfig] = useState<Class[]>([]);
  const [loadingClasses, setLoadingClasses] = useState(true);

  // Load real classes from firestore
  useEffect(() => {
    if (!school?.id) return;
    const unsub = onSnapshot(collection(db, 'schools', school.id, 'classes'), (snap) => {
      setClassesConfig(snap.docs.map(d => ({ id: d.id, ...d.data() } as Class)));
      setLoadingClasses(false);
    });
    return () => unsub();
  }, [school?.id]);

  // Sync theme from school settings when loaded
  useEffect(() => {
    if (school?.settings?.reportCardTheme) {
      setSelectedTheme(school.settings.reportCardTheme);
    }
  }, [school?.settings?.reportCardTheme]);

  const themes = [
    { id: 'standard', name: 'Standard Layout', desc: 'Classic, straightforward tabular design.' },
    { id: 'modern', name: 'Modern Elegant', desc: 'Sleek, global aesthetic focusing on visual hierarchy.' },
    { id: 'minimalist', name: 'Minimalist', desc: 'Clean, data-focused layout without distractions.' },
  ];

  const WAEC_DEFAULT: GradeRange[] = [
    { label: 'A1', min: 75, max: 100, remark: 'Excellent' },
    { label: 'B2', min: 70, max: 74, remark: 'Very Good' },
    { label: 'B3', min: 65, max: 69, remark: 'Good' },
    { label: 'C4', min: 60, max: 64, remark: 'Credit' },
    { label: 'C5', min: 55, max: 59, remark: 'Credit' },
    { label: 'C6', min: 50, max: 54, remark: 'Credit' },
    { label: 'D7', min: 45, max: 49, remark: 'Pass' },
    { label: 'E8', min: 40, max: 44, remark: 'Pass' },
    { label: 'F9', min: 0, max: 39, remark: 'Fail' },
  ];

  const [gradingScale, setGradingScale] = useState<GradeRange[]>(
    school?.settings?.gradingSystem?.length ? school.settings.gradingSystem : WAEC_DEFAULT
  );

  const [assessmentsConfig, setAssessmentsConfig] = useState<AssessmentColumn[]>(
    school?.settings?.assessments?.length ? school.settings.assessments : [
      { id: 'ca1', label: 'CA 1', maxScore: 20 },
      { id: 'ca2', label: 'CA 2', maxScore: 20 },
      { id: 'exam', label: 'Exam', maxScore: 60 }
    ]
  );

  const toggleClassPosition = async (classId: string, current: boolean) => {
    if (!school?.id) return;
    try {
      await updateDoc(doc(db, 'schools', school.id, 'classes', classId), { usePositions: !current });
    } catch (e) { console.error(e); }
  };

  const changeAssessmentType = async (classId: string, type: 'numerical' | 'observational') => {
    if (!school?.id) return;
    try {
      await updateDoc(doc(db, 'schools', school.id, 'classes', classId), { assessmentType: type });
    } catch (e) { console.error(e); }
  };

  const handleSave = async () => {
    if (!school?.id) return;
    
    // Validate assessments sum to 100
    const totalMax = assessmentsConfig.reduce((acc, curr) => acc + curr.maxScore, 0);
    if (totalMax !== 100) {
      alert(`Assessments max score must sum to 100. Current sum is ${totalMax}.`);
      return;
    }

    try {
      await updateDoc(doc(db, 'schools', school.id), {
        settings: {
          ...school.settings,
          reportCardTheme: selectedTheme,
          gradingSystem: gradingScale,
          assessments: assessmentsConfig,
          reportCardColors,
          reportCardFont
        }
      });
      alert('Academic Configuration Saved Successfully');
    } catch (err) {
      alert('Failed to save configuration');
    }
  };

  const updateGradingScale = (index: number, field: keyof GradeRange, value: string | number) => {
    const newScale = [...gradingScale];
    newScale[index] = { ...newScale[index], [field]: value };
    setGradingScale(newScale);
  };

  const removeGradeBand = (index: number) => {
    setGradingScale(gradingScale.filter((_, i) => i !== index));
  };

  const addGradeBand = () => {
    setGradingScale([...gradingScale, { label: 'New', min: 0, max: 0, remark: '' }]);
  };

  const updateAssessment = (index: number, field: keyof AssessmentColumn, value: string | number) => {
    const newAssessments = [...assessmentsConfig];
    newAssessments[index] = { ...newAssessments[index], [field]: value };
    setAssessmentsConfig(newAssessments);
  };

  const removeAssessment = (index: number) => {
    setAssessmentsConfig(assessmentsConfig.filter((_, i) => i !== index));
  };

  const addAssessment = () => {
    const newId = `ca${assessmentsConfig.length + 1}`;
    setAssessmentsConfig([...assessmentsConfig, { id: newId, label: 'New CA', maxScore: 10 }]);
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
            onClick={() => setActiveTab('assessments')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'assessments' ? 'bg-slate-800 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <ListOrdered className="w-5 h-5" /> Assessments Columns
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
              
              <div className="mt-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Custom Aesthetics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Primary Color (Gradient Start)</label>
                    <div className="flex items-center gap-3">
                      <input type="color" value={reportCardColors.primary} onChange={(e) => setReportCardColors({...reportCardColors, primary: e.target.value})} className="w-12 h-12 rounded-lg cursor-pointer border-0 p-0" />
                      <input type="text" value={reportCardColors.primary} onChange={(e) => setReportCardColors({...reportCardColors, primary: e.target.value})} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Secondary Color (Gradient End)</label>
                    <div className="flex items-center gap-3">
                      <input type="color" value={reportCardColors.secondary} onChange={(e) => setReportCardColors({...reportCardColors, secondary: e.target.value})} className="w-12 h-12 rounded-lg cursor-pointer border-0 p-0" />
                      <input type="text" value={reportCardColors.secondary} onChange={(e) => setReportCardColors({...reportCardColors, secondary: e.target.value})} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold" />
                    </div>
                  </div>
                  <div className="md:col-span-2 mt-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Report Card Font</label>
                    <select value={reportCardFont} onChange={(e) => setReportCardFont(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold">
                      <option value="Inter">Inter (Clean & Modern)</option>
                      <option value="Merriweather">Merriweather (Classic Serif)</option>
                      <option value="Roboto">Roboto (Technical & Crisp)</option>
                      <option value="Outfit">Outfit (Playful & Geometric)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'assessments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-2">Assessment Columns</h2>
                  <p className="text-gray-500 max-w-xl">
                    Define the continuous assessments and exams. The total Max Score of all columns must exactly equal 100.
                  </p>
                </div>
                <button onClick={addAssessment} className="flex items-center gap-2 text-sm font-bold text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  <Plus className="w-4 h-4" /> Add Column
                </button>
              </div>

              <div className="overflow-x-auto mt-8 border border-gray-100 rounded-2xl shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-widest">
                    <tr>
                      <th className="p-4 font-bold">Column ID</th>
                      <th className="p-4 font-bold">Display Label</th>
                      <th className="p-4 font-bold">Max Score</th>
                      <th className="p-4 font-bold w-20">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {assessmentsConfig.map((col, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <input type="text" value={col.id} onChange={(e) => updateAssessment(idx, 'id', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 focus:ring-2 focus:ring-indigo-500" />
                        </td>
                        <td className="p-4">
                          <input type="text" value={col.label} onChange={(e) => updateAssessment(idx, 'label', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 focus:ring-2 focus:ring-indigo-500" />
                        </td>
                        <td className="p-4">
                          <input type="number" value={col.maxScore} onChange={(e) => updateAssessment(idx, 'maxScore', Number(e.target.value))} className="w-32 px-3 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 focus:ring-2 focus:ring-indigo-500" />
                        </td>
                        <td className="p-4 text-right">
                          <button onClick={() => removeAssessment(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <X className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50 border-t border-gray-100">
                    <tr>
                      <td colSpan={2} className="p-4 font-black text-right text-gray-600 uppercase tracking-widest">Total Sum:</td>
                      <td className={`p-4 font-black text-lg ${assessmentsConfig.reduce((a,b)=>a+b.maxScore,0) === 100 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {assessmentsConfig.reduce((a,b)=>a+b.maxScore,0)} / 100
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'grading' && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-2">Grading System Configuration</h2>
                  <p className="text-gray-500 max-w-xl">
                    Configure the grade bands used for numerical assessments. Add or remove bands to match your school's unique grading (e.g., WAEC A1-F9 or standard A-F).
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setGradingScale(WAEC_DEFAULT)} className="text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors">
                    WAEC Preset
                  </button>
                  <button onClick={addGradeBand} className="flex items-center gap-2 text-sm font-bold text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    <Plus className="w-4 h-4" /> Add Band
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto mt-8 border border-gray-100 rounded-2xl shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-widest">
                    <tr>
                      <th className="p-4 font-bold">Grade</th>
                      <th className="p-4 font-bold">Min Score</th>
                      <th className="p-4 font-bold">Max Score</th>
                      <th className="p-4 font-bold">Remark</th>
                      <th className="p-4 font-bold w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {gradingScale.map((scale, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                           <input type="text" value={scale.label} onChange={(e) => updateGradingScale(idx, 'label', e.target.value)} className="w-20 px-3 py-1.5 border border-gray-200 rounded-lg text-lg font-black text-gray-900 focus:ring-2 focus:ring-indigo-500" />
                        </td>
                        <td className="p-4">
                          <input type="number" value={scale.min} onChange={(e) => updateGradingScale(idx, 'min', Number(e.target.value))} className="w-24 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 focus:ring-2 focus:ring-indigo-500" />
                        </td>
                        <td className="p-4">
                          <input type="number" value={scale.max} onChange={(e) => updateGradingScale(idx, 'max', Number(e.target.value))} className="w-24 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 focus:ring-2 focus:ring-indigo-500" />
                        </td>
                        <td className="p-4">
                          <input type="text" value={scale.remark} onChange={(e) => updateGradingScale(idx, 'remark', e.target.value)} className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 focus:ring-2 focus:ring-indigo-500" />
                        </td>
                        <td className="p-4">
                          <button onClick={() => removeGradeBand(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <X className="w-4 h-4" />
                          </button>
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
                {loadingClasses ? (
                  <div className="py-10 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600" /></div>
                ) : classesConfig.length === 0 ? (
                  <p className="text-gray-400 font-bold text-center py-10">No classes found. Add classes first from the Classes page.</p>
                ) : (
                  classesConfig.map(cls => (
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
                            onClick={() => toggleClassPosition(cls.id, cls.usePositions || false)}
                            className={`w-12 h-6 rounded-full transition-colors relative ${cls.usePositions ? 'bg-indigo-500' : 'bg-gray-200'}`}
                          >
                            <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${cls.usePositions ? 'left-7' : 'left-1'}`} />
                          </button>
                        </div>

                        <div className="w-px h-10 bg-gray-200 hidden sm:block" />

                        <div>
                           <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Assessment</span>
                           <select 
                             value={cls.assessmentType || 'numerical'}
                             onChange={(e) => changeAssessmentType(cls.id, e.target.value as any)}
                             className="text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                           >
                             <option value="numerical">Numerical</option>
                             <option value="observational">Observational</option>
                           </select>
                        </div>
                      </div>
                    </div>
                  ))
                )}
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
