import { NavLink } from 'react-router-dom';
import { List, Search, PieChart, Settings, ShoppingBasket, Search as SearchIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { to: '/dashboard', icon: List, label: 'Lists' },
  { to: '/search', icon: Search, label: 'Search' },
  { to: '/budget', icon: PieChart, label: 'Budget' },
  { to: '/settings', icon: Settings, label: 'Settings' }
];

export const TopNavigation = () => {
  return (
    <div className="hidden md:flex bg-white dark:bg-[#1E1E1E] shadow-sm px-8 py-4 items-center justify-between sticky top-0 z-50 transition-colors">
      <div className="flex items-center gap-2 text-[#00695C] dark:text-[#80CBC4]">
        <ShoppingBasket size={28} strokeWidth={2} />
        <h1 className="text-2xl font-bold font-serif text-[#004D40] dark:text-white">Shoppy Cart</h1>
      </div>
      
      <div className="flex items-center gap-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 font-medium",
                isActive ? "bg-[#26A69A] text-white shadow-md shadow-[#26A69A]/20" : "text-gray-500 dark:text-gray-400 hover:text-[#00695C] dark:hover:text-[#80CBC4] hover:bg-[#E0F2F1]/50 dark:hover:bg-[#2C2C2C]/50"
              )}
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-sm">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
      
      {/* Spacer to maintain layout balance after removing search icon */}
      <div className="w-[36px]"></div>
    </div>
  );
};

export const BottomNavigation = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-[#1E1E1E] border-t border-gray-100 dark:border-[#2C2C2C] flex justify-around items-center h-20 px-4 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-none z-40 transition-colors">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center w-16 h-16 rounded-full transition-all duration-300",
              isActive ? "bg-[#26A69A] text-white -translate-y-2 shadow-lg shadow-[#26A69A]/30" : "text-gray-400 dark:text-gray-500 hover:text-[#26A69A] dark:hover:text-[#80CBC4]"
            )}
          >
            <Icon size={24} strokeWidth={2} />
            <span className={cn("text-[10px] mt-1 font-medium", "opacity-100")}>
              {item.label}
            </span>
          </NavLink>
        );
      })}
    </div>
  );
};
