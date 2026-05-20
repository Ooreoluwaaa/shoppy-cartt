import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBasket, Search as SearchIcon, List, Plus, SearchX, Wallet } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Search = () => {
  const navigate = useNavigate();
  const { lists } = useStore();
  const [query, setQuery] = useState('');

  // Search logic: group items by list
  const searchResults = lists.map(list => {
    const matchedItems = list.items.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    if (matchedItems.length === 0) return null;
    return {
      listId: list.id,
      listName: list.name,
      items: matchedItems
    };
  }).filter(Boolean);

  const totalBudget = lists.reduce((acc, list) => acc + (list.budget || 0), 0);
  const totalSpent = lists.reduce((acc, list) => acc + list.items.filter(i => i.bought).reduce((sum, i) => sum + (i.price * i.quantity), 0), 0);
  const progressPercent = totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;
  const remainingBudget = totalBudget - totalSpent;

  return (
    <div className="flex flex-col relative min-h-full pb-10">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-6 pb-2 bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2 text-[#00695C]">
          <ShoppingBasket size={24} strokeWidth={2} />
          <h1 className="text-xl font-bold font-serif text-[#004D40]">Shoppy Cart</h1>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="bg-white md:rounded-[32px] md:shadow-sm md:border md:border-gray-100 p-6 md:p-12 mb-6 flex-1 flex flex-col">
        
        {/* Search Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Global Search</h2>
          <p className="text-gray-600 text-sm">Find any product across your lists or discover new items.</p>
        </div>

        {/* Search Input */}
        <div className="max-w-2xl mx-auto w-full mb-10">
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00695C] transition-colors">
              <SearchIcon size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Search products, brands, or categories..." 
              className="w-full bg-[#F9FAFB] border border-gray-300 rounded-full py-4 pl-14 pr-28 focus:outline-none focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C] text-sm transition-all text-gray-800"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#00695C] text-white px-8 py-2.5 rounded-full text-sm font-medium hover:bg-[#004D40] transition-colors shadow-sm">
              Find
            </button>
          </div>
        </div>

        <hr className="border-gray-100 mb-8" />

        {/* Results */}
        <div className="flex-1 max-w-4xl mx-auto w-full">
          {searchResults.length > 0 ? (
            searchResults.map(result => (
              <div key={result.listId} className="mb-8 animate-fade-in-up">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{result.listName}</h3>
                  <span className="bg-[#E0EAE7] text-[#00695C] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {result.items.length} Result{result.items.length !== 1 ? 's' : ''}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.items.map(item => (
                    <div key={item.id} className="p-4 border border-gray-200 rounded-full flex items-center justify-between cursor-pointer hover:bg-gray-50 hover:border-[#00695C] transition-all group shadow-sm bg-white" onClick={() => navigate(`/list/${result.listId}`)}>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#F4F7F6] rounded-full flex items-center justify-center text-[#00695C] group-hover:bg-[#E0EAE7] transition-colors overflow-hidden border border-gray-100">
                           <ShoppingBasket size={20} />
                        </div>
                        <div>
                          <h4 className="text-[15px] font-medium text-gray-800">{item.name}</h4>
                          <div className="flex items-center text-[10px] font-medium text-gray-500 mt-0.5 gap-1.5 uppercase tracking-wide">
                            <List size={12} className="text-gray-400" />
                            <span>{result.listName}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-[14px] font-bold text-[#00695C] pr-4">₦{(item.price || 0).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : query ? (
            <div className="text-center py-10 text-gray-500 text-sm font-medium">No results found for "{query}"</div>
          ) : null}

          {/* Not Found / Empty State Section */}
          <div className="mt-12">
            <hr className="border-gray-100 mb-10" />
            <div className="text-center max-w-md mx-auto">
              <div className="w-16 h-16 bg-[#F4F7F6] rounded-full flex items-center justify-center text-gray-400 mx-auto mb-6">
                <SearchX size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Can't find what you're looking for?</h3>
              <p className="text-sm text-gray-600 mb-8 leading-relaxed px-4">
                If the item you're looking for isn't in our database yet, you can create a custom item to track its price and availability.
              </p>
              <button 
                onClick={() => navigate('/dashboard')}
                className="border border-[#00695C] text-[#00695C] px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#F4F7F6] transition-all flex items-center justify-center gap-2 mx-auto"
              >
                <Plus size={18} />
                Create New Item
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Bar Desktop */}
      <div className="bg-[#D9EAE6] rounded-full p-4 px-6 md:px-8 shadow-sm flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#00695C]">
            <Wallet size={20} />
          </div>
          <div>
            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Remaining Budget</p>
            <p className="text-xl font-bold text-gray-900 leading-none">₦{remainingBudget.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
          </div>
        </div>
        
        <div className="w-1/3 min-w-[200px] flex items-center gap-4">
          <div className="flex-1 flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-[10px] font-bold text-gray-600 tracking-wide uppercase">
              <span>Spent: ₦{totalSpent.toLocaleString()}</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-2 bg-white rounded-full overflow-hidden w-full">
              <div className="h-full bg-[#00695C] rounded-full transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Search;
