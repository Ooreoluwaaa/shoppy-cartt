import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MoreVertical, Trash2, CheckCircle2, Circle, AlertTriangle, ShoppingCart, Edit2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ItemDetailsModal from '../components/ItemDetailsModal';

const ListDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lists, toggleItemBought, deleteItemFromList, checkPriceAlert } = useStore();
  const [newItemName, setNewItemName] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const list = lists.find(l => l.id === id);
  if (!list) return <div className="p-6 text-center">List not found</div>;

  const totalBudget = list.budget || 0;
  const estimatedTotal = list.items.reduce((acc, i) => acc + ((i.price || 0) * (i.quantity || 1)), 0);
  const remaining = totalBudget - estimatedTotal;
  const boughtCount = list.items.filter(i => i.bought).length;
  const totalCount = list.items.length;
  const progressPercent = totalCount > 0 ? (boughtCount / totalCount) * 100 : 0;

  const handleAddNewItem = () => {
    if (newItemName.trim()) {
      setSelectedItem({ name: newItemName, quantity: 1, price: 0, priceAlert: false });
      setIsModalOpen(true);
      setNewItemName('');
    }
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-[#F0F0F0] min-h-full flex flex-col relative">
      {/* Header */}
      <div className="flex justify-between items-center p-6 bg-white rounded-b-3xl shadow-sm z-10 sticky top-0">
        <button onClick={() => navigate(-1)} className="text-[#26A69A]">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-[#26A69A] flex-1 ml-4 font-serif">{list.name}</h1>
        <div className="flex gap-4 text-gray-400">
          <button onClick={() => navigate('/search')} className="hover:text-[#26A69A] transition-colors"><Search size={20} /></button>
          <button className="hover:text-[#26A69A] transition-colors"><MoreVertical size={20} /></button>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Budget Card */}
        <div className="bg-[#E0F2F1] rounded-3xl p-6 mb-6 shadow-sm">
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <p className="text-[10px] text-[#1e837a]/60 uppercase font-bold mb-1">Budget</p>
              <p className="text-[15px] font-bold text-gray-800">₦{totalBudget.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#1e837a]/60 uppercase font-bold mb-1">Estimated Total</p>
              <p className="text-[15px] font-bold text-gray-800">₦{estimatedTotal.toLocaleString()}</p>
            </div>
          </div>
          <div className="mb-5">
            <p className="text-[10px] text-[#1e837a]/60 uppercase font-bold mb-1">Remaining</p>
            <p className={`text-2xl font-bold ${remaining < 0 ? 'text-[#D32F2F]' : 'text-[#26A69A]'}`}>
              ₦{remaining.toLocaleString()}
            </p>
          </div>
          <div className="flex justify-between text-xs text-[#1e837a] font-medium mb-2">
            <span>Completion Progress</span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <div className="h-1.5 bg-white/60 rounded-full overflow-hidden">
            <div className="h-full bg-[#26A69A] rounded-full transition-all duration-700" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        {/* Add Item Input */}
        <div className="relative mb-6 shadow-sm group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#26A69A] transition-colors">
            <ShoppingCart size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Add a new item..." 
            className="w-full bg-white rounded-full py-4 pl-12 pr-24 focus:outline-none focus:ring-1 focus:ring-[#26A69A] text-sm text-gray-800 transition-all border border-transparent focus:border-[#26A69A]/30"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddNewItem()}
          />
          <button 
            onClick={handleAddNewItem}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#26A69A] text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-[#1e837a] transition-colors shadow-md"
          >
            Add
          </button>
        </div>

        {/* Item List */}
        <div className="bg-white rounded-[24px] shadow-sm overflow-hidden mb-24 border border-gray-100">
          {list.items.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">No items added yet.</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {list.items.map(item => {
                const hasAlert = item.priceAlert && checkPriceAlert(item.name, item.price);
                return (
                  <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                    <div className="flex items-center gap-4 flex-1 cursor-pointer" onClick={() => toggleItemBought(list.id, item.id)}>
                      <button className={`transition-colors flex-shrink-0 ${item.bought ? 'text-[#26A69A]' : 'text-gray-300 group-hover:text-[#26A69A]/50'}`}>
                        {item.bought ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                      </button>
                      <div className="flex-1" onClick={(e) => { e.stopPropagation(); handleEditItem(item); }}>
                        <h4 className={`text-[15px] font-medium transition-colors ${item.bought ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                          {item.name} {item.quantity > 1 && <span className="text-gray-400 font-normal ml-1">({item.quantity}pk)</span>}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <p className={`text-xs ${item.bought ? 'text-gray-400' : 'text-gray-500 font-medium'}`}>₦{(item.price || 0).toLocaleString()}</p>
                          {hasAlert && !item.bought && (
                            <span className="flex items-center gap-1 text-[9px] font-bold text-white bg-[#D32F2F] px-1.5 py-0.5 rounded uppercase tracking-wider shadow-sm">
                              <AlertTriangle size={10} /> Price Alert
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleEditItem(item); }}
                        className="text-gray-300 hover:text-[#26A69A] p-2 transition-colors flex-shrink-0 opacity-50 group-hover:opacity-100"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => deleteItemFromList(list.id, item.id)}
                        className="text-gray-300 hover:text-red-500 p-2 transition-colors flex-shrink-0 opacity-50 group-hover:opacity-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <ItemDetailsModal 
          item={selectedItem} 
          listId={list.id} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};
export default ListDetails;
