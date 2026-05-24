import React, { useState } from 'react';
import { useSchool } from '../../hooks/useSchool';
import { BookOpen, Search, Plus, Filter, AlertCircle, CheckCircle2, MoreVertical, CreditCard, Clock, RotateCcw, BookMarked, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { LibraryBook, LibraryTransaction } from '../../types';

export default function LibraryManagement() {
  const { school } = useSchool();
  const [activeTab, setActiveTab] = useState<'inventory' | 'transactions'>('inventory');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Data
  const [books] = useState<LibraryBook[]>([
    { id: 'bk-1', schoolId: '1', title: 'New General Mathematics for JSS1', author: 'M.F. Macrae et al.', isbn: '978-0-123456-47-2', status: 'available', location: 'Shelf A1', category: 'Textbook' },
    { id: 'bk-2', schoolId: '1', title: 'Things Fall Apart', author: 'Chinua Achebe', isbn: '978-0-385-47454-2', status: 'borrowed', location: 'Shelf C4', category: 'Literature' },
    { id: 'bk-3', schoolId: '1', title: 'Essential Biology', author: 'M.C. Michael', isbn: '978-978-123-456-7', status: 'available', location: 'Shelf B2', category: 'Science' },
    { id: 'bk-4', schoolId: '1', title: 'Advanced English Grammar', author: 'Raymond Murphy', isbn: '978-0-521-18906-4', status: 'lost', location: 'Shelf A3', category: 'Reference' },
  ]);

  const [transactions] = useState<LibraryTransaction[]>([
    { id: 'tx-1', schoolId: '1', bookId: 'bk-2', studentId: 'John Doe', issueDate: '2026-05-10', dueDate: '2026-05-24', fineAmount: 0, status: 'active' },
    { id: 'tx-2', schoolId: '1', bookId: 'bk-3', studentId: 'Jane Smith', issueDate: '2026-05-01', dueDate: '2026-05-15', fineAmount: 1500, status: 'overdue' },
    { id: 'tx-3', schoolId: '1', bookId: 'bk-1', studentId: 'Alex Brown', issueDate: '2026-04-20', dueDate: '2026-05-04', returnDate: '2026-05-03', fineAmount: 0, status: 'returned' },
  ]);

  const filteredBooks = books.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.author.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredTx = transactions.filter(t => t.studentId.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <header className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1e1b4b] to-indigo-900 p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[80px] -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full mb-4 border border-white/10">
              <BookMarked className="w-4 h-4 text-indigo-300" />
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-100">Library Engine</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">Central Library</h1>
            <p className="text-indigo-200 font-medium">Manage book inventory, digital issuances, and student fines.</p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-indigo-500/20 hover:bg-indigo-500/40 text-white px-6 py-4 rounded-2xl font-bold shadow-lg transition-all border border-indigo-400/30">
              <RotateCcw className="w-5 h-5" />
              Return Book
            </button>
            <button className="flex items-center gap-2 bg-indigo-500 text-white px-6 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-500/20 hover:bg-indigo-400 transition-all">
              <Plus className="w-5 h-5" />
              Issue Book
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Inventory', value: '1,245', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Books Borrowed', value: '184', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Overdue Returns', value: '12', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'Pending Fines', value: '₦4,500', icon: CreditCard, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex items-center gap-5">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 md:p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-2 p-1 bg-slate-50 rounded-2xl w-full md:w-auto">
            <button 
              onClick={() => setActiveTab('inventory')}
              className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'inventory' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Book Inventory
            </button>
            <button 
              onClick={() => setActiveTab('transactions')}
              className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'transactions' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Active Transactions
            </button>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder={activeTab === 'inventory' ? "Search books..." : "Search students..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button className="p-3 bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-2xl transition-all">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-x-auto">
          {activeTab === 'inventory' ? (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-50">
                  <th className="p-6 pl-8">Book Details</th>
                  <th className="p-6">Category</th>
                  <th className="p-6">Location</th>
                  <th className="p-6 text-center">Status</th>
                  <th className="p-6 text-right pr-8">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 pl-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{book.title}</p>
                          <p className="text-xs font-bold text-slate-500">{book.author} • ISBN: {book.isbn}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 font-bold text-slate-600 text-sm">{book.category}</td>
                    <td className="p-6 font-bold text-slate-600 text-sm">{book.location}</td>
                    <td className="p-6 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest ${
                        book.status === 'available' ? 'bg-emerald-50 text-emerald-600' :
                        book.status === 'borrowed' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                      }`}>
                        {book.status === 'available' && <CheckCircle2 className="w-3 h-3" />}
                        {book.status === 'borrowed' && <Clock className="w-3 h-3" />}
                        {book.status === 'lost' && <AlertCircle className="w-3 h-3" />}
                        {book.status}
                      </span>
                    </td>
                    <td className="p-6 text-right pr-8">
                      <button className="p-2 hover:bg-slate-200 rounded-xl transition-all text-slate-400 hover:text-slate-600">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-50">
                  <th className="p-6 pl-8">Transaction Info</th>
                  <th className="p-6">Issue / Due Date</th>
                  <th className="p-6 text-center">Status</th>
                  <th className="p-6 text-right">Fines</th>
                  <th className="p-6 text-right pr-8">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredTx.map((tx) => {
                  const book = books.find(b => b.id === tx.bookId);
                  return (
                    <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-6 pl-8">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 font-black">
                            {tx.studentId.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{tx.studentId}</p>
                            <p className="text-xs font-bold text-slate-500">Book: {book?.title}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <p className="text-sm font-bold text-slate-600">Issued: {tx.issueDate}</p>
                        <p className="text-xs font-bold text-slate-400">Due: {tx.dueDate}</p>
                      </td>
                      <td className="p-6 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest ${
                          tx.status === 'active' ? 'bg-indigo-50 text-indigo-600' :
                          tx.status === 'overdue' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="p-6 text-right">
                        {tx.fineAmount > 0 ? (
                          <span className="font-black text-rose-600">₦{tx.fineAmount.toLocaleString()}</span>
                        ) : (
                          <span className="font-black text-slate-400">-</span>
                        )}
                      </td>
                      <td className="p-6 text-right pr-8">
                        {tx.status !== 'returned' && (
                          <button className="px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                            Process
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
