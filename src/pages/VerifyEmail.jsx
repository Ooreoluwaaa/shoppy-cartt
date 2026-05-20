import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBasket, ShieldCheck } from 'lucide-react';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;
    
    const newCode = [...code];
    // Handle pasting multiple digits
    if (value.length > 1) {
      const pastedDigits = value.slice(0, 6 - index).split('');
      pastedDigits.forEach((digit, i) => {
        if (index + i < 6) newCode[index + i] = digit;
      });
      setCode(newCode);
      const nextEmptyIndex = newCode.findIndex(c => c === '');
      const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
      inputRefs[focusIndex].current.focus();
      return;
    }

    newCode[index] = value;
    setCode(newCode);

    // Auto-advance
    if (value !== '' && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace auto-reverse
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col h-full md:h-auto bg-white md:bg-transparent text-gray-800 p-6 pt-16 relative">
      <div className="flex-1 flex flex-col items-center">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#26A69A] p-4 rounded-full mb-4 shadow-sm">
            <ShoppingBasket size={36} strokeWidth={2} className="text-[#004D40]" />
          </div>
          <h1 className="text-3xl font-bold tracking-wide text-[#00695C] mb-1" style={{ fontFamily: 'Georgia, serif' }}>Shoppy Cart</h1>
          <h2 className="text-2xl font-bold text-gray-900 mt-4">Verify Email</h2>
          <p className="text-base text-gray-600 mt-2 text-center max-w-xs">
            Enter the 6-digit code sent to your email address.
          </p>
        </div>

        <div className="bg-[#F0F4F4] rounded-full py-2 px-6 mb-8 flex items-center space-x-4 border border-gray-200">
          <span className="text-sm font-medium text-gray-700">name@example.com</span>
          <button onClick={() => navigate('/signup')} className="text-sm font-bold text-[#00695C] hover:underline">Edit</button>
        </div>

        <div className="flex justify-center space-x-2 w-full mb-8">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 sm:w-14 sm:h-14 bg-[#F4F7F6] border border-gray-200 rounded-full text-center text-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#26A69A] focus:bg-white transition-all shadow-sm"
            />
          ))}
        </div>

        <button 
          onClick={handleSubmit}
          className="w-full bg-[#26A69A] text-white rounded-full py-3.5 font-bold text-sm tracking-widest mt-2 shadow-sm hover:bg-[#208e84] transition-all uppercase"
        >
          Verify & Continue
        </button>

        <p className="mt-8 text-base text-gray-700">
          Didn't receive a code? <button className="text-[#00695C] font-bold hover:underline ml-1">Resend</button>
        </p>

        <div className="mt-auto pt-10 pb-4 w-full flex flex-col items-center">
          <div className="w-full border-t border-gray-200 mb-6"></div>
          <div className="flex items-center text-gray-500 space-x-2">
            <ShieldCheck size={18} strokeWidth={1.5} />
            <span className="text-xs font-medium">Secure Verification Engine</span>
          </div>
        </div>
      </div>
      
      {/* Light gradient base to match other pages feel */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#EFEFEF] to-transparent pointer-events-none rounded-b-xl opacity-50 z-0"></div>
    </div>
  );
};
export default VerifyEmail;
