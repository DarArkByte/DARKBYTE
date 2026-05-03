import React, { useState } from 'react';
import { Send, MessageSquare, Plus, Trash2, Layout, Smartphone, Share2, Copy, Check } from 'lucide-react';

export default function NewsletterCenter() {
  const [copied, setCopied] = useState(false);
  const [content, setContent] = useState(`🚨 OFFICIAL SCHOOL UPDATE - [DATE]\n\nDear Parents,\n\nWe are excited to share the following updates with you:\n\n1. 🎓 Upcoming Exams: Mid-term assessments begin next week.\n2. ⚽ Sports Day: All students are required to wear their sport jerseys this Friday.\n3. 📄 Result Access: Termly results are now available on the portal.\n\nWarm Regards,\nThe School Management`);

  const handleWhatsAppSend = () => {
    const encoded = encodeURIComponent(content);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 pb-24 font-sans">
      <header className="relative overflow-hidden rounded-[56px] bg-emerald-900 p-10 md:p-16 text-white shadow-2xl">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -ml-20 -mb-20" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 flex items-center gap-4">
              <Share2 className="w-10 h-10 text-emerald-400" />
              WHATSAPP NEWSLETTER
            </h1>
            <p className="text-emerald-100 font-bold text-lg max-w-xl">Zero-Cost communication. Generate beautiful newsletters and broadcast them instantly via WhatsApp.</p>
          </div>
          <div className="flex gap-4">
             <button className="flex items-center gap-3 bg-white text-emerald-900 px-10 py-5 rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
                <Layout className="w-5 h-5" /> Saved Templates
             </button>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
           <div className="bg-white p-10 rounded-[48px] shadow-sm border border-slate-100 space-y-6">
              <div className="flex justify-between items-center">
                 <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Compose Newsletter</h2>
                 <button onClick={() => setContent('')} className="text-slate-400 hover:text-rose-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
              </div>
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-[400px] p-8 bg-slate-50 rounded-[32px] border-none font-bold text-slate-700 leading-relaxed focus:ring-2 focus:ring-emerald-500"
                placeholder="Type your announcement here..."
              />
              <div className="flex gap-4">
                 <button 
                   onClick={copyToClipboard}
                   className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-3xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
                 >
                   {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                   {copied ? 'Copied' : 'Copy Text'}
                 </button>
                 <button 
                   onClick={handleWhatsAppSend}
                   className="flex-[2] py-5 bg-emerald-600 text-white rounded-3xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20 hover:scale-105 transition-transform"
                 >
                   <Send className="w-4 h-4" /> Broadcast via WhatsApp
                 </button>
              </div>
           </div>
        </div>

        <div className="space-y-8">
           <div className="bg-[#1e1b4b] p-10 rounded-[56px] text-white shadow-2xl relative overflow-hidden flex flex-col items-center">
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
              <div className="w-full max-w-[280px] aspect-[9/19] bg-slate-900 rounded-[40px] border-[8px] border-slate-800 p-6 relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-slate-800 rounded-b-2xl" />
                 <div className="mt-8 space-y-4">
                    <div className="bg-emerald-100 p-4 rounded-2xl rounded-tl-none self-start max-w-[90%]">
                       <p className="text-[10px] text-slate-900 font-bold leading-relaxed whitespace-pre-wrap">{content}</p>
                       <p className="text-[8px] text-slate-400 mt-2 text-right">12:45 PM</p>
                    </div>
                 </div>
              </div>
              <h3 className="mt-8 text-xl font-black tracking-tighter text-emerald-400">Mobile Preview Active</h3>
              <p className="text-slate-400 text-center font-medium mt-2 text-sm">This is exactly how your newsletter will appear on parents' phones.</p>
           </div>

           <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Parent Reach Metrics</h4>
              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-1">
                    <p className="text-3xl font-black text-slate-900">1,240</p>
                    <p className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Active Phone Numbers</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-3xl font-black text-slate-900">100%</p>
                    <p className="text-[8px] font-black text-indigo-600 uppercase tracking-widest">Delivery Potential</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
