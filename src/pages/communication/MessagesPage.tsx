import React, { useState } from 'react';
import { Mail, Send, Inbox, MessageSquare, Plus, CheckCircle2, User, FileText, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'sent' | 'parents' | 'broadcast'>('inbox');

  // Dummy data
  const messages = [
    { id: '1', sender: 'Mrs. Smith', subject: 'Math Assignment Update', preview: 'Please note the deadline has been extended...', date: 'Today, 09:41 AM', read: false, type: 'internal' },
    { id: '2', sender: 'Admin Office', subject: 'Mid-Term Break', preview: 'The school will be closing for mid-term...', date: 'Yesterday', read: true, type: 'internal' },
  ];

  return (
    <div className="space-y-8 pb-12 h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-white shadow-xl shrink-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-sans font-extrabold mb-2 flex items-center gap-3">
              <MessageSquare className="w-8 h-8" />
              Communication Hub
            </h1>
            <p className="text-indigo-100 font-medium">Internal messaging and external Mail/SMS broadcasting.</p>
          </div>
          <button className="flex items-center gap-2 bg-white text-indigo-700 px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all w-fit">
            <Plus className="w-5 h-5" />
            Compose Message
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0">
        
        {/* Sidebar Nav */}
        <div className="lg:w-64 shrink-0 flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('inbox')}
            className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'inbox' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <div className="flex items-center gap-3"><Inbox className="w-5 h-5" /> Inbox</div>
            <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">2</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('sent')}
            className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'sent' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <div className="flex items-center gap-3"><Send className="w-5 h-5" /> Sent</div>
          </button>

          <button 
            onClick={() => setActiveTab('parents')}
            className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'parents' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <div className="flex items-center gap-3"><Users className="w-5 h-5" /> Parent Chats</div>
          </button>

          <div className="h-px bg-gray-100 my-2" />

          <button 
            onClick={() => setActiveTab('broadcast')}
            className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'broadcast' ? 'bg-violet-50 text-violet-700' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <div className="flex items-center gap-3"><Smartphone className="w-5 h-5" /> SMS / Mail Broadcast</div>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
          
          {activeTab === 'broadcast' ? (
             <div className="p-8 h-full flex flex-col items-center justify-center text-center">
               <div className="bg-violet-100 p-6 rounded-full mb-6 text-violet-600">
                 <Smartphone className="w-12 h-12" />
               </div>
               <h2 className="text-2xl font-black text-gray-900 mb-2">Mass Broadcast System</h2>
               <p className="text-gray-500 mb-8 max-w-md">Send SMS or Email alerts to specific classes, all parents, or all teachers instantly.</p>
               <button className="bg-violet-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:bg-violet-700 transition-colors">
                 Setup SMS Gateway Integration
               </button>
             </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              <div className="divide-y divide-gray-50">
                {messages.map((msg, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={msg.id} 
                    className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer flex gap-4 ${!msg.read && activeTab === 'inbox' ? 'bg-indigo-50/30' : ''}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-100 shrink-0 flex items-center justify-center text-gray-500">
                      <User className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`text-sm truncate ${!msg.read && activeTab === 'inbox' ? 'font-black text-gray-900' : 'font-bold text-gray-700'}`}>
                          {msg.sender}
                        </h3>
                        <span className={`text-xs whitespace-nowrap ${!msg.read && activeTab === 'inbox' ? 'font-bold text-indigo-600' : 'font-medium text-gray-400'}`}>
                          {msg.date}
                        </span>
                      </div>
                      <p className={`text-sm mb-1 truncate ${!msg.read && activeTab === 'inbox' ? 'font-bold text-gray-900' : 'font-medium text-gray-900'}`}>
                        {msg.subject}
                      </p>
                      <p className="text-sm text-gray-500 truncate">{msg.preview}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
