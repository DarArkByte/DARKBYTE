import React, { useState, useEffect } from 'react';
import { Package, AlertCircle, ShoppingBag, Plus, Search, Tag, BarChart3, ArrowRight, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../../lib/firebase';
import { collection, onSnapshot, addDoc, updateDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { useSchool } from '../../hooks/useSchool';

interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  min: number;
  price: number;
  category: string;
}

export default function StorePage() {
  const { school } = useSchool();
  const [activeCategory, setActiveCategory] = useState('all');
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  // POS State
  const [saleStudent, setSaleStudent] = useState('');
  const [saleItem, setSaleItem] = useState('');
  const [isSelling, setIsSelling] = useState(false);

  // New Item State
  const [newItem, setNewItem] = useState({ name: '', stock: 0, min: 5, price: 0, category: 'uniform' });

  useEffect(() => {
    if (!school?.id) return;
    const q = query(collection(db, 'schools', school.id, 'inventory'), orderBy('name'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as InventoryItem));
      setItems(data);
      setLoading(false);
    });
    return unsubscribe;
  }, [school?.id]);

  const handleAddStock = async () => {
    if (!school?.id || !newItem.name) return;
    try {
      await addDoc(collection(db, 'schools', school.id, 'inventory'), {
        ...newItem,
        createdAt: serverTimestamp()
      });
      setShowAddModal(false);
      setNewItem({ name: '', stock: 0, min: 5, price: 0, category: 'uniform' });
    } catch (err) {
      alert('Failed to add item');
    }
  };

  const handleFinalizeSale = async () => {
    if (!school?.id || !saleItem || !saleStudent) return;
    setIsSelling(true);
    try {
      const item = items.find(i => i.id === saleItem);
      if (!item) return;
      if (item.stock <= 0) {
        alert('Item out of stock!');
        return;
      }

      // 1. Update Inventory
      await updateDoc(doc(db, 'schools', school.id, 'inventory', item.id), {
        stock: item.stock - 1
      });

      // 2. Record Transaction
      await addDoc(collection(db, 'schools', school.id, 'transactions'), {
        studentId: saleStudent,
        itemId: item.id,
        itemName: item.name,
        amount: item.price,
        type: 'store_purchase',
        date: serverTimestamp()
      });

      setSaleStudent('');
      setSaleItem('');
      alert('Sale Successful!');
    } catch (err) {
      alert('Sale failed');
    } finally {
      setIsSelling(false);
    }
  };

  const filteredItems = items.filter(i => 
    (activeCategory === 'all' || i.category === activeCategory) &&
    i.name.toLowerCase().includes(search.toLowerCase())
  );

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
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-white text-indigo-950 font-black px-8 py-4 rounded-2xl hover:scale-105 transition-all flex items-center gap-2 shadow-2xl"
          >
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
                 <input 
                   type="text" 
                   placeholder="Search items..." 
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                   className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold" 
                 />
               </div>
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-20 text-center"><Loader2 className="w-10 h-10 animate-spin mx-auto text-indigo-600" /></div>
              ) : (
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
                    {filteredItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
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
                        <td className="p-6 text-center font-bold text-gray-600">₦{item.price.toLocaleString()}</td>
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
              )}
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
                   <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Student ID / Name</label>
                   <input 
                     type="text" 
                     placeholder="e.g. STU-001" 
                     value={saleStudent}
                     onChange={(e) => setSaleStudent(e.target.value)}
                     className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold" 
                   />
                </div>
                <div>
                   <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Select Item</label>
                   <select 
                     value={saleItem}
                     onChange={(e) => setSaleItem(e.target.value)}
                     className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold cursor-pointer"
                   >
                      <option value="">Select Item...</option>
                      {items.map(s => <option key={s.id} value={s.id} disabled={s.stock <= 0}>{s.name} - ₦{s.price.toLocaleString()} ({s.stock} left)</option>)}
                   </select>
                </div>
                <button 
                  onClick={handleFinalizeSale}
                  disabled={isSelling || !saleItem || !saleStudent}
                  className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-600/20 hover:scale-105 disabled:opacity-50 disabled:scale-100 transition-all flex items-center justify-center gap-2 mt-4"
                >
                   {isSelling ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Finalize Sale <ArrowRight className="w-5 h-5" /></>}
                </button>
             </div>
          </div>

          <div className="bg-indigo-50 rounded-[40px] p-8 border border-indigo-100">
             <BarChart3 className="w-8 h-8 text-indigo-600 mb-4" />
             <h4 className="font-black text-indigo-900 mb-2 tracking-tight text-lg">Sales Hub</h4>
             <p className="text-sm text-indigo-700 leading-relaxed font-medium">Every transaction is recorded in the student financial history and school revenue pool.</p>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white rounded-[40px] w-full max-w-xl p-10 shadow-2xl">
              <button onClick={() => setShowAddModal(false)} className="absolute top-8 right-8 text-gray-400 hover:text-gray-600 transition-colors"><X className="w-6 h-6" /></button>
              <h2 className="text-2xl font-black text-gray-900 mb-8">Register New Inventory</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Item Name</label>
                  <input type="text" value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 font-bold" />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Opening Stock</label>
                  <input type="number" value={newItem.stock} onChange={(e) => setNewItem({...newItem, stock: Number(e.target.value)})} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 font-bold" />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Unit Price (₦)</label>
                  <input type="number" value={newItem.price} onChange={(e) => setNewItem({...newItem, price: Number(e.target.value)})} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 font-bold" />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Category</label>
                  <select value={newItem.category} onChange={(e) => setNewItem({...newItem, category: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 font-bold cursor-pointer">
                    <option value="uniform">Uniform</option>
                    <option value="books">Books</option>
                    <option value="stationery">Stationery</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Min Alert Level</label>
                  <input type="number" value={newItem.min} onChange={(e) => setNewItem({...newItem, min: Number(e.target.value)})} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 font-bold" />
                </div>
              </div>
              <button onClick={handleAddStock} className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-600/20 hover:scale-105 transition-all mt-10">Add to Repository</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
