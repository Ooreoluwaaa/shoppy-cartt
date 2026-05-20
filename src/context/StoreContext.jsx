import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const [lists, setLists] = useState(() => {
    const saved = localStorage.getItem('shoppy_cart_lists');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: uuidv4(),
        name: 'Groceries',
        budget: 50000,
        createdAt: new Date().toISOString(),
        items: [
          { id: uuidv4(), name: 'Ofada Rice', price: 12500, quantity: 1, bought: true, priceAlert: false },
          { id: uuidv4(), name: 'Indomie Noodles (Carton)', price: 7500, quantity: 1, bought: false, priceAlert: false }
        ]
      },
      {
        id: uuidv4(),
        name: 'Tech & Gadgets',
        budget: 150000,
        createdAt: new Date().toISOString(),
        items: [
          { id: uuidv4(), name: 'Oraimo Powerbank', price: 25000, quantity: 1, bought: true, priceAlert: true }
        ]
      }
    ];
  });

  const [priceHistory, setPriceHistory] = useState(() => {
    const saved = localStorage.getItem('shoppy_cart_price_history');
    if (saved) return JSON.parse(saved);
    return {}; // { "item name": maxPriceSeen }
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('shoppy_cart_dark_mode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('shoppy_cart_lists', JSON.stringify(lists));
  }, [lists]);

  useEffect(() => {
    localStorage.setItem('shoppy_cart_price_history', JSON.stringify(priceHistory));
  }, [priceHistory]);

  useEffect(() => {
    localStorage.setItem('shoppy_cart_dark_mode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const addList = (name, budget) => {
    setLists([...lists, { id: uuidv4(), name, budget: parseFloat(budget) || 0, items: [], createdAt: new Date().toISOString() }]);
  };

  const deleteList = (id) => {
    setLists(lists.filter(l => l.id !== id));
  };

  const updateList = (id, data) => {
    setLists(lists.map(l => l.id === id ? { ...l, ...data } : l));
  };

  const addItemToList = (listId, item) => {
    setLists(lists.map(l => {
      if (l.id === listId) {
        return { ...l, items: [...l.items, { ...item, id: uuidv4(), bought: false }] };
      }
      return l;
    }));
    checkAndUpdatePriceHistory(item);
  };

  const updateItemInList = (listId, itemId, data) => {
    setLists(lists.map(l => {
      if (l.id === listId) {
        return { ...l, items: l.items.map(i => i.id === itemId ? { ...i, ...data } : i) };
      }
      return l;
    }));
    if (data.price !== undefined) {
      checkAndUpdatePriceHistory(data);
    }
  };

  const deleteItemFromList = (listId, itemId) => {
    setLists(lists.map(l => {
      if (l.id === listId) {
        return { ...l, items: l.items.filter(i => i.id !== itemId) };
      }
      return l;
    }));
  };

  const toggleItemBought = (listId, itemId) => {
    setLists(lists.map(l => {
      if (l.id === listId) {
        return { ...l, items: l.items.map(i => i.id === itemId ? { ...i, bought: !i.bought } : i) };
      }
      return l;
    }));
  };

  const checkAndUpdatePriceHistory = (item) => {
    if (!item.name || item.price === undefined) return;
    const nameKey = item.name.toLowerCase().trim();
    
    setPriceHistory(prev => {
      const currentHighest = prev[nameKey] || 0;
      if (item.price > currentHighest) {
        return { ...prev, [nameKey]: item.price };
      }
      return prev;
    });
  };

  const checkPriceAlert = (itemName, currentPrice) => {
    if (!itemName || currentPrice === undefined) return false;
    const nameKey = itemName.toLowerCase().trim();
    const highestSeen = priceHistory[nameKey];
    if (highestSeen && currentPrice > highestSeen) {
      return true; // Price has gone up!
    }
    return false;
  };

  return (
    <StoreContext.Provider value={{
      lists,
      addList,
      deleteList,
      updateList,
      addItemToList,
      updateItemInList,
      deleteItemFromList,
      toggleItemBought,
      checkPriceAlert,
      isDarkMode,
      toggleDarkMode
    }}>
      {children}
    </StoreContext.Provider>
  );
};
