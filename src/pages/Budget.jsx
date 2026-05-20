import { useStore } from '../context/StoreContext';
import { Wallet, PieChart, TrendingUp, AlertCircle } from 'lucide-react';

const Budget = () => {
  const { lists } = useStore();
  
  const totalBudget = lists.reduce((acc, list) => acc + (list.budget || 0), 0);
  const totalSpent = lists.reduce((acc, list) => {
    const items = list.items || [];
    return acc + items.filter(i => i.bought).reduce((sum, i) => sum + ((i.price || 0) * (i.quantity || 1)), 0);
  }, 0);
  const progressPercent = totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;
  const remaining = totalBudget - totalSpent;

  return (
    <div className="bg-white min-h-full flex flex-col relative pb-20">
      <div className="px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Budget Overview</h2>
        <p className="text-sm text-gray-500 mb-8">Track your spending across all your shopping lists.</p>

        {/* Global Budget Card */}
        <div className="bg-gradient-to-br from-[#E0F2F1] to-[#D0EBE8] rounded-3xl p-6 mb-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-20">
            <PieChart size={100} strokeWidth={1} />
          </div>
          <p className="text-[10px] text-[#1e837a] font-bold uppercase tracking-wider mb-2 relative z-10">Total Remaining</p>
          <div className="flex items-end gap-2 mb-6 relative z-10">
            <span className="text-4xl font-bold text-[#004D40]">₦{remaining.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4 relative z-10">
            <div className="bg-white/50 rounded-2xl p-4 backdrop-blur-sm">
              <p className="text-[10px] text-[#1e837a] font-bold uppercase tracking-wider mb-1">Total Limit</p>
              <p className="text-lg font-bold text-[#004D40]">₦{totalBudget.toLocaleString()}</p>
            </div>
            <div className="bg-white/50 rounded-2xl p-4 backdrop-blur-sm">
              <p className="text-[10px] text-[#1e837a] font-bold uppercase tracking-wider mb-1">Total Spent</p>
              <p className="text-lg font-bold text-[#004D40]">₦{totalSpent.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="relative z-10 mt-2">
            <div className="flex justify-between text-xs text-[#1e837a] font-medium mb-2">
              <span>{Math.round(progressPercent)}% Used</span>
            </div>
            <div className="h-2 bg-white/50 rounded-full overflow-hidden">
              <div className="h-full bg-[#26A69A] rounded-full transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-4">Breakdown by List</h3>
        <div className="space-y-4 mb-24">
          {lists.map(list => {
            const listItems = list.items || [];
            const listSpent = listItems.filter(i => i.bought).reduce((sum, i) => sum + ((i.price || 0) * (i.quantity || 1)), 0);
            const listBudget = list.budget || 0;
            const listProgress = listBudget > 0 ? Math.min((listSpent / listBudget) * 100, 100) : 0;
            const isOver = listSpent > listBudget;

            return (
              <div key={list.id} className="border border-gray-100 rounded-3xl p-5 shadow-sm bg-white hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-gray-800">{list.name}</h4>
                  {isOver && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-[#D32F2F] bg-[#FFEBEE] px-2 py-1 rounded uppercase tracking-wider">
                      <AlertCircle size={12} /> Over Limit
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-[#26A69A]">₦{listSpent.toLocaleString()} <span className="text-gray-400 font-normal text-xs">spent</span></span>
                  <span className="text-xs text-gray-500 font-medium">Limit: ₦{listBudget.toLocaleString()}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-700 ${isOver ? 'bg-[#D32F2F]' : 'bg-[#26A69A]'}`} style={{ width: `${listProgress}%` }}></div>
                </div>
              </div>
            );
          })}
          {lists.length === 0 && (
             <div className="p-8 text-center text-gray-400 text-sm">No lists found. Create a list to see budget tracking.</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Budget;
