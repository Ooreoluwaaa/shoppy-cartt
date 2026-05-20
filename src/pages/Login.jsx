import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBasket } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col h-full md:h-auto bg-white md:bg-transparent text-gray-800 relative pb-10">
      <div className="flex-1 flex flex-col p-6 pt-12">
        <div className="flex flex-col items-center mb-8">
          <ShoppingBasket size={48} strokeWidth={2} className="text-[#00695C] mb-4" />
          <h1 className="text-3xl font-bold tracking-wide text-[#00695C] mb-1" style={{ fontFamily: 'Georgia, serif' }}>Shoppy Cart</h1>
          <h2 className="text-xl font-semibold text-gray-900">Welcome Back</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600 ml-1">Email Address</label>
            <div className="relative">
              <input 
                type="email" 
                placeholder="name@example.com"
                className="w-full bg-[#F4F7F6] rounded-full py-3 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-[#26A69A] transition-all border border-gray-100"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600 ml-1">Password</label>
            <div className="relative flex items-center">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                className="w-full bg-[#F4F7F6] rounded-full py-3 px-5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#26A69A] transition-all border border-gray-100 tracking-widest"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 text-gray-500 hover:text-gray-700 transition-colors">
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button type="button" className="text-xs font-bold text-[#00695C] hover:underline">Forgot password?</button>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#26A69A] text-white rounded-full py-3.5 font-medium text-lg mt-4 shadow-sm hover:bg-[#208e84] transition-all"
          >
            Login
          </button>
        </form>

        <div className="flex items-center my-8">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-xs font-medium text-gray-500 uppercase">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <button className="w-full bg-white border border-gray-300 text-gray-700 rounded-full py-3 font-medium flex items-center justify-center space-x-2 shadow-sm hover:bg-gray-50 transition-all">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="mt-8 text-center z-10 relative">
          <p className="text-sm text-gray-700 font-medium">
            Don't have an account? <Link to="/signup" className="text-[#00695C] font-bold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#E0E7E5] to-transparent pointer-events-none rounded-b-xl opacity-60"></div>
    </div>
  );
};
export default Login;
