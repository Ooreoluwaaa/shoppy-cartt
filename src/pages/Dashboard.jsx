import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBasket, Search, ShoppingCart, Laptop, Plus, Edit2, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { lists, addList, deleteList, updateList } = useStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListBudget, setNewListBudget] = useState('');
  const [editingListId, setEditingListId] = useState(null);

  const handleCreateList = () => {
    if (newListName.trim()) {
      if (editingListId) {
        updateList(editingListId, { name: newListName, budget: parseFloat(newListBudget) || 0 });
      } else {
        addList(newListName, newListBudget);
      }
      setShowCreateModal(false);
      setNewListName('');
      setNewListBudget('');
      setEditingListId(null);
    }
  };

  const openEditModal = (list) => {
    setEditingListId(list.id);
    setNewListName(list.name);
    setNewListBudget(list.budget || '');
    setShowCreateModal(true);
  };

  const calculateTotalBudget = () => lists.reduce((acc, list) => acc + (list.budget || 0), 0);
  const calculateTotalSpent = () => lists.reduce((acc, list) => {
    const items = list.items || [];
    return acc + items.filter(i => i.bought).reduce((sum, i) => sum + ((i.price || 0) * (i.quantity || 1)), 0);
  }, 0);

  const totalBudget = calculateTotalBudget();
  const totalSpent = calculateTotalSpent();
  const progressPercent = totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;

  return (
    <div className="bg-white dark:bg-transparent min-h-full flex flex-col relative transition-colors">
      {/* Header */}
      <div className="flex justify-between items-center p-6 pb-2">
        <div className="flex items-center gap-2 text-[#26A69A] dark:text-[#80CBC4]">
          <ShoppingBasket size={24} strokeWidth={2} />
          <h1 className="text-xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>Shoppy Cart</h1>
        </div>
        <button onClick={() => navigate('/search')} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
          <Search size={22} />
        </button>
      </div>

      <div className="px-6 py-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">List Dashboard</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Manage your shopping errands with ease.</p>

        {/* Budget Card */}
        <div className="bg-[#E0F2F1] dark:bg-[#004D40]/30 rounded-3xl p-6 mb-8 shadow-sm transition-colors">
          <p className="text-[10px] text-[#1e837a] dark:text-[#80CBC4] font-bold uppercase tracking-wider mb-2">Monthly Budget Status</p>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-3xl font-bold text-[#1e837a] dark:text-[#4DB6AC]">₦{totalSpent.toLocaleString()}</span>
            <span className="text-sm text-[#1e837a]/60 dark:text-[#80CBC4]/60 font-medium mb-1">/ ₦{totalBudget.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs text-[#1e837a] dark:text-[#80CBC4] font-medium mb-2">
            <span>Completion</span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <div className="h-2 bg-white/50 dark:bg-black/20 rounded-full overflow-hidden">
            <div className="h-full bg-[#26A69A] rounded-full transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        {/* Lists */}
        <div className="space-y-4 mb-24">
          {lists.map(list => {
            const items = list.items || [];
            const boughtCount = items.filter(i => i.bought).length;
            const totalCount = items.length;
            const listProgress = totalCount > 0 ? (boughtCount / totalCount) * 100 : 0;
            
            return (
              <div 
                key={list.id} 
                className="border border-gray-100 dark:border-[#2C2C2C] rounded-3xl p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden group cursor-pointer bg-white dark:bg-[#1E1E1E]"
                onClick={(e) => {
                  if(!e.target.closest('button')) navigate(`/list/${list.id}`);
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-[#E0F2F1] dark:bg-[#004D40]/30 rounded-2xl flex items-center justify-center text-[#26A69A] dark:text-[#80CBC4] transition-colors">
                    {list.name.toLowerCase().includes('tech') ? <Laptop size={22} /> : <ShoppingCart size={22} />}
                  </div>
                  <div className="flex gap-3 text-gray-300 dark:text-gray-600">
                    <button onClick={(e) => { e.stopPropagation(); openEditModal(list); }} className="hover:text-[#26A69A] dark:hover:text-[#80CBC4] transition-colors"><Edit2 size={16} /></button>
                    <button onClick={(e) => { e.stopPropagation(); deleteList(list.id); }} className="hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">{list.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">{totalCount} items • Updated recently</p>
                
                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">
                  <span>Progress</span>
                  <span className="text-gray-800 dark:text-gray-300">{boughtCount} / {totalCount} Bought</span>
                </div>
                <div className="h-1.5 bg-gray-100 dark:bg-[#2C2C2C] rounded-full overflow-hidden">
                  <div className="h-full bg-[#26A69A] rounded-full transition-all duration-700" style={{ width: `${listProgress}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAB */}
      <button 
        onClick={() => {
          setEditingListId(null);
          setNewListName('');
          setNewListBudget('');
          setShowCreateModal(true);
        }}
        className="fixed bottom-[100px] left-1/2 -translate-x-1/2 sm:left-auto sm:-translate-x-0 sm:ml-[310px] bg-[#26A69A] text-white px-6 py-3.5 rounded-full flex items-center gap-2 shadow-[0_8px_20px_rgba(38,166,154,0.4)] hover:bg-[#1e837a] hover:-translate-y-1 transition-all z-30 whitespace-nowrap"
      >
        <Plus size={20} />
        <span className="font-semibold text-sm">Create New List</span>
      </button>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 w-full max-w-sm transition-colors border border-gray-200/50 dark:border-[#2C2C2C]">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">{editingListId ? 'Edit List' : 'Create New List'}</h3>
            <input 
              type="text" 
              placeholder="List Name (e.g. Grocery)" 
              className="w-full bg-gray-50 dark:bg-[#2C2C2C] border border-gray-200 dark:border-[#333] text-gray-800 dark:text-gray-100 rounded-2xl px-4 py-3 mb-4 focus:outline-none focus:border-[#26A69A] focus:ring-1 focus:ring-[#26A69A] transition-all placeholder-gray-400 dark:placeholder-gray-500"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
            <input 
              type="number" 
              placeholder="Budget Limit (₦)" 
              className="w-full bg-gray-50 dark:bg-[#2C2C2C] border border-gray-200 dark:border-[#333] text-gray-800 dark:text-gray-100 rounded-2xl px-4 py-3 mb-6 focus:outline-none focus:border-[#26A69A] focus:ring-1 focus:ring-[#26A69A] transition-all placeholder-gray-400 dark:placeholder-gray-500"
              value={newListBudget}
              onChange={(e) => setNewListBudget(e.target.value)}
            />
            <div className="flex gap-3">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-3 text-gray-500 dark:text-gray-400 font-bold hover:bg-gray-50 dark:hover:bg-[#2C2C2C] rounded-2xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateList}
                className="flex-1 py-3 bg-[#26A69A] text-white font-bold rounded-2xl shadow-md hover:bg-[#1e837a] transition-colors"
              >
                {editingListId ? 'Save' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Dashboard;
