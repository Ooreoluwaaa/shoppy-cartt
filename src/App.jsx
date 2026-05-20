import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Splash from './pages/Splash';
import Dashboard from './pages/Dashboard';
import ListDetails from './pages/ListDetails';
import Search from './pages/Search';
import { TopNavigation, BottomNavigation } from './components/Navigation';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail';
import Budget from './pages/Budget';
import Settings from './pages/Settings';

const Layout = ({ children }) => {
  const location = useLocation();
  // Hide nav on splash, auth pages and maybe list details
  const hideNav = location.pathname === '/' || ['/login', '/signup', '/verify'].includes(location.pathname) || location.pathname.includes('/list/');
  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${hideNav ? 'bg-gradient-to-br from-[#E2EBE9] to-[#EAF0EF] dark:from-[#1A2524] dark:to-[#121B1A]' : 'bg-[#F4F7F6] dark:bg-[#121212]'}`}>
      {!hideNav && <TopNavigation />}
      
      <div className={hideNav 
        ? "flex-1 flex justify-center items-center p-0 md:p-6 relative" 
        : "flex-1 w-full max-w-[1000px] mx-auto pb-24 md:pb-8 pt-0 md:pt-6 px-0 md:px-6 relative"}>
        
        <div className={hideNav 
          ? "w-full max-w-[480px] bg-white dark:bg-[#1E1E1E] min-h-screen md:min-h-fit md:rounded-[32px] md:shadow-xl relative flex flex-col overflow-hidden transition-colors duration-300" 
          : "w-full h-full flex flex-col relative"}>
          {children}
        </div>
      </div>
      
      {!hideNav && <BottomNavigation />}
    </div>
  );
};

function App() {
  return (
    <StoreProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/list/:id" element={<ListDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<VerifyEmail />} />
          </Routes>
        </Layout>
      </Router>
    </StoreProvider>
  );
}

export default App;
