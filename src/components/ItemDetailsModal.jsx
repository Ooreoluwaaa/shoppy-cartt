import { useState } from 'react';
import { X, Minus, Plus, TrendingDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const ItemDetailsModal = ({ item, listId, onClose }) => {
  const { addItemToList, updateItemInList } = useStore();
  const [quantity, setQuantity] = useState(item?.quantity || 1);
  const [price, setPrice] = useState(item?.price || 0);
  const [priceAlert, setPriceAlert] = useState(item?.priceAlert || false);
  const [itemName, setItemName] = useState(item?.name || '');

  const isEdit = !!item?.id;

  const handleSave = () => {
    if (!itemName.trim()) return;
    if (isEdit) {
      updateItemInList(listId, item.id, { name: itemName, quantity, price: parseFloat(price) || 0, priceAlert });
    } else {
      addItemToList(listId, { name: itemName, quantity, price: parseFloat(price) || 0, priceAlert });
    }
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#212121]/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[32px] w-full max-w-sm overflow-hidden animate-fade-in-up">
        {/* Header Area */}
        <div className="relative pt-12 pb-6 px-6 bg-[#E0F2F1] flex flex-col justify-end overflow-hidden">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/50 hover:bg-white rounded-full p-2 backdrop-blur transition-colors z-20"
          >
            <X size={20} className="text-gray-800" />
          </button>
          
          <div className="relative z-20">
             <p className="text-[10px] font-bold text-[#26A69A] tracking-wider uppercase mb-1">{itemName.toLowerCase().includes('blueberries') ? 'PRODUCE' : 'ITEM'}</p>
             <input 
               type="text"
               value={itemName}
               onChange={(e) => setItemName(e.target.value)}
               placeholder="Item name"
               className="text-3xl font-bold text-gray-800 leading-tight font-serif bg-transparent border-b border-transparent focus:border-[#26A69A]/30 focus:outline-none w-full pb-1"
             />
          </div>
        </div>

        <div className="p-6">
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Quantity</label>
              <div className="flex items-center justify-between border border-gray-200 rounded-2xl p-1">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-gray-400 hover:text-gray-800 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="font-bold text-gray-800 text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-gray-400 hover:text-gray-800 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Price per item</label>
              <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3 h-[52px]">
                <span className="text-gray-400 mr-1 font-bold">₦</span>
                <input 
                  type="number" 
                  step="0.01"
                  className="w-full focus:outline-none font-bold text-gray-800 bg-transparent text-lg"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-[#E0F2F1]/50 border border-[#E0F2F1] rounded-2xl p-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-xl text-[#26A69A] shadow-sm">
                <TrendingDown size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">Price Watch</p>
                <p className="text-[10px] text-gray-500">Alert me if the price changes</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={priceAlert} onChange={() => setPriceAlert(!priceAlert)} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#26A69A]"></div>
            </label>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="px-6 py-4 text-gray-500 font-bold hover:bg-gray-50 rounded-2xl transition-colors uppercase text-xs tracking-wider"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="flex-1 py-4 bg-[#26A69A] text-white font-bold rounded-2xl shadow-[0_8px_20px_rgba(38,166,154,0.3)] hover:bg-[#1e837a] hover:-translate-y-0.5 transition-all uppercase text-xs tracking-wider"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemDetailsModal;
