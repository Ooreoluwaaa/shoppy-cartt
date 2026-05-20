import { User, Bell, Shield, LogOut, ChevronRight, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const Settings = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useStore();

  return (
    <div className="bg-[#F9FAFB] dark:bg-transparent min-h-full flex flex-col relative pb-20 transition-colors">
      <div className="px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">Settings</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Manage your account and preferences.</p>

        {/* Profile Card */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-5 mb-6 shadow-sm border border-gray-100 dark:border-[#2C2C2C] flex items-center gap-4 transition-colors">
          <div className="w-14 h-14 bg-[#E0F2F1] dark:bg-[#004D40]/30 rounded-full flex items-center justify-center text-[#26A69A]">
            <User size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">John Doe</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">name@example.com</p>
          </div>
          <button onClick={() => navigate('/login')} className="text-xs font-bold text-[#26A69A] dark:text-[#80CBC4] bg-[#E0F2F1] dark:bg-[#004D40]/30 px-4 py-2 rounded-full hover:bg-[#D0EBE8] dark:hover:bg-[#004D40]/50 transition-colors">
            Log out
          </button>
        </div>

        {/* Setting Groups */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl shadow-sm border border-gray-100 dark:border-[#2C2C2C] overflow-hidden mb-6 transition-colors">
          <div className="p-4 flex items-center justify-between border-b border-gray-50 dark:border-[#2C2C2C] cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2C2C2C] transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 dark:bg-[#2C2C2C] p-2 rounded-xl text-gray-600 dark:text-gray-300 transition-colors"><Bell size={18} /></div>
              <span className="font-medium text-gray-800 dark:text-gray-200">Notifications & Alerts</span>
            </div>
            <ChevronRight size={18} className="text-gray-400 dark:text-gray-500" />
          </div>
          <div className="p-4 flex items-center justify-between border-b border-gray-50 dark:border-[#2C2C2C] cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2C2C2C] transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 dark:bg-[#2C2C2C] p-2 rounded-xl text-gray-600 dark:text-gray-300 transition-colors"><Shield size={18} /></div>
              <span className="font-medium text-gray-800 dark:text-gray-200">Privacy & Security</span>
            </div>
            <ChevronRight size={18} className="text-gray-400 dark:text-gray-500" />
          </div>
          <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2C2C2C] transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 dark:bg-[#2C2C2C] p-2 rounded-xl text-gray-600 dark:text-gray-300 transition-colors"><Moon size={18} /></div>
              <span className="font-medium text-gray-800 dark:text-gray-200">Dark Mode</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
              <input type="checkbox" className="sr-only peer" checked={isDarkMode} onChange={toggleDarkMode} />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#26A69A]"></div>
            </label>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-gray-400 dark:text-gray-500">Shoppy Cart v1.0.0</p>
        </div>
      </div>
    </div>
  );
};
export default Settings;
