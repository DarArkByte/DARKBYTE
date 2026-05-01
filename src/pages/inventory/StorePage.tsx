import React, { useState } from 'react';
import { Package, AlertCircle, ShoppingBag, Plus, Search, Tag, BarChart3, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const stock = [
    { id: '1', name: 'Springfield Blazer (L)', stock: 4, min: 10, price: '₦12,500', category: 'uniform' },
    { id: '2', name: 'Mathematics Textbook JS1', stock: 45, min: 20, price: '₦4,200', category: 'books' },
    { id: '3', name: 'School Tie', stock: 12, min: 15, price: '₦1,500', category: 'uniform' },
    { id: '4', name: 'Graph Book (Dozen)', stock: 8, min: 5, price: '₦3,600', category: 'stationery' },
  ];

  return (
    <div className="space-y-8 pb-12 font-sans">
      <header className="relative overflow-hidden rounded-[40px] bg-indigo-950 p-10 text-white shadow-xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black mb-2 flex items-center gap-3 tracking-tight">
              <Package className="w-10 h-10 text-indigo-400" />
              Inventory & POS
            </h1>
            <p className="text-indigo-200 font-medium">Digital store management with real-time stock alerts.</p>
          </div>
          <button className="bg-white text-indigo-950 font-black px-8 py-4 rounded-2xl hover:scale-105 transition-all flex items-center gap-2 shadow-2xl">
            <Plus className="w-5 h-5" /> Add New Stock
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Inventory Table */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
               <div className="flex gap-4">
                 {['all', 'uniform', 'books', 'stationery'].map(cat => (
                   <button 
                     key={cat}
                     onClick={() => setActiveCategory(cat)}
                     className={`text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${activeCategory === cat ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
                   >
                     {cat}
                   </button>
                 ))}
               </div>
               <div className="relative w-64">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                 <input type="text" placeholder="Search items..." className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm" />
               </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                    <th className="p-6">Item Details</th>
                    <th className="p-6 text-center">In Stock</th>
                    <th className="p-6 text-center">Unit Price</th>
                    <th className="p-6 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {stock.map((item, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                             {item.category === 'uniform' ? <Tag /> : <ShoppingBag />}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{item.name}</p>
                            <p className="text-xs text-indigo-600 font-bold uppercase">{item.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 text-center font-black text-gray-900">{item.stock}</td>
                      <td className="p-6 text-center font-bold text-gray-600">{item.price}</td>
                      <td className="p-6 text-right">
                         {item.stock < item.min ? (
                           <span className="bg-rose-100 text-rose-700 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-tighter flex items-center gap-1 justify-end">
                             <AlertCircle className="w-3 h-3" /> Critical Stock
                           </span>
                         ) : (
                           <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-tighter">Healthy</span>
                         )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Sales / POS */}
        <div className="space-y-6">
          <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-xl">
             <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
               <ShoppingBag className="text-indigo-600" /> Quick Sell
             </h3>
             <div className="space-y-4">
                <div>
                   <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Student ID</label>
                   <input type="text" placeholder="e.g. STU-001" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold" />
                </div>
                <div>
                   <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Scan / Select Item</label>
                   <select className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold">
                      <option>Select Item...</option>
                      {stock.map(s => <option key={s.id}>{s.name} - {s.price}</option>)}
                   </select>
                </div>
                <button className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-600/20 hover:scale-105 transition-all flex items-center justify-center gap-2 mt-4">
                   Finalize Sale <ArrowRight className="w-5 h-5" />
                </button>
             </div>
          </div>

          <div className="bg-indigo-50 rounded-[40px] p-8 border border-indigo-100">
             <BarChart3 className="w-8 h-8 text-indigo-600 mb-4" />
             <h4 className="font-black text-indigo-900 mb-2 tracking-tight text-lg">Sales Analysis</h4>
             <p className="text-sm text-indigo-700 leading-relaxed font-medium">Your most sold item this week is <strong className="text-indigo-900">Mathematics JS1 Textbooks</strong>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
