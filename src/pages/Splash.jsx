import { useNavigate } from 'react-router-dom';
import { ShoppingBasket } from 'lucide-react';

const Splash = () => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate('/login')}
      className="h-full md:min-h-[600px] bg-[#26A69A] flex flex-col items-center justify-center text-white p-6 relative cursor-pointer"
    >
      <div className="flex flex-col items-center animate-pulse duration-1000">
        <ShoppingBasket size={80} strokeWidth={1.5} className="mb-4" />
        <h1 className="text-4xl font-bold tracking-wide mb-2" style={{ fontFamily: 'Georgia, serif' }}>Shoppy Cart</h1>
      </div>
      <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center opacity-80">
        <div className="w-12 h-1 bg-white rounded-full mb-4 opacity-50"></div>
        <p className="text-[10px] tracking-widest uppercase font-medium">Tap anywhere to continue</p>
      </div>
    </div>
  );
};
export default Splash;
