import React, { useState } from 'react';
import { Database, Plus, Search, HelpCircle, Layers, CheckCircle2, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { QuestionBank } from '../../types';

export default function QuestionBankPage() {
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState('All');

  // Dummy data
  const questions: QuestionBank[] = [
    { id: '1', schoolId: 's1', subjectId: 'Mathematics', classId: 'JSS 1', questionText: 'What is the square root of 144?', type: 'multiple-choice', difficulty: 'easy', options: [{ id: 'a', text: '12', isCorrect: true }, { id: 'b', text: '14', isCorrect: false }] },
    { id: '2', schoolId: 's1', subjectId: 'English Language', classId: 'JSS 2', questionText: 'Write a short essay on "The impact of technology on education".', type: 'essay', difficulty: 'hard' },
    { id: '3', schoolId: 's1', subjectId: 'Physics', classId: 'SSS 1', questionText: 'State Newton\'s first law of motion.', type: 'essay', difficulty: 'medium' },
  ];

  const filteredQuestions = questions.filter(q => 
    (filterClass === 'All' || q.classId === filterClass) && 
    (q.questionText.toLowerCase().includes(search.toLowerCase()) || q.subjectId.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-fuchsia-600 to-purple-700 p-8 text-white shadow-xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-sans font-extrabold mb-2 flex items-center gap-3">
              <Database className="w-8 h-8" />
              Question Bank
            </h1>
            <p className="text-fuchsia-100 font-medium">Create and manage a repository of CBT exam questions.</p>
          </div>
          <button className="flex items-center gap-2 bg-white text-fuchsia-700 px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all w-fit">
            <Plus className="w-5 h-5" />
            Add Question
          </button>
        </div>
      </header>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search questions or subjects..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-fuchsia-500 transition-all font-medium text-gray-700"
          />
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <select 
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="bg-gray-50 border-none rounded-xl px-4 py-3 font-bold text-gray-700 focus:ring-2 focus:ring-fuchsia-500 w-full sm:w-auto"
          >
            <option value="All">All Classes</option>
            <option value="JSS 1">JSS 1</option>
            <option value="JSS 2">JSS 2</option>
            <option value="SSS 1">SSS 1</option>
          </select>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            key={q.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-fuchsia-200 transition-colors group relative"
          >
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-indigo-600 bg-gray-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
              <button className="p-2 text-gray-400 hover:text-rose-600 bg-gray-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
            </div>

            <div className="flex items-start gap-4 mb-4">
              <div className={`mt-1 p-2 rounded-lg ${q.type === 'multiple-choice' ? 'bg-indigo-100 text-indigo-600' : 'bg-orange-100 text-orange-600'}`}>
                {q.type === 'multiple-choice' ? <CheckCircle2 className="w-5 h-5" /> : <HelpCircle className="w-5 h-5" />}
              </div>
              <div className="flex-1 pr-24">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{q.subjectId}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span className="text-xs font-bold text-fuchsia-600 bg-fuchsia-50 px-2 py-0.5 rounded-md">{q.classId}</span>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border ${
                    q.difficulty === 'easy' ? 'border-emerald-200 text-emerald-600' : 
                    q.difficulty === 'medium' ? 'border-amber-200 text-amber-600' : 'border-rose-200 text-rose-600'
                  }`}>
                    {q.difficulty}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 leading-relaxed">{q.questionText}</h3>
              </div>
            </div>

            {q.type === 'multiple-choice' && q.options && (
              <div className="ml-14 grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {q.options.map(opt => (
                  <div key={opt.id} className={`p-3 rounded-xl border flex items-center gap-3 ${opt.isCorrect ? 'border-emerald-200 bg-emerald-50' : 'border-gray-100 bg-gray-50'}`}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${opt.isCorrect ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-gray-300'}`}>
                      {opt.isCorrect && <CheckCircle2 className="w-3 h-3" />}
                    </div>
                    <span className={`font-medium ${opt.isCorrect ? 'text-emerald-900' : 'text-gray-600'}`}>{opt.text}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
        {filteredQuestions.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 border-dashed">
            <Layers className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 font-bold">No questions found in the bank.</p>
          </div>
        )}
      </div>
    </div>
  );
}
