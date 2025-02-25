import React, { useContext, useEffect, useState } from 'react';
import { Bell, Home, Building2, Menu, X, Hotel } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useLocation, useParams } from 'react-router-dom';
import { AuthContext } from '@/Context/AuthContext';
import { Routes, Route } from 'react-router-dom';
import Profile from '@/pages/Profile';
import Room from '@/pages/Room';
import Kittchen from '@/pages/Kitchen';
import { FaBowlFood } from 'react-icons/fa6';
import HotelOrders from '@/pages/HotelOrders';

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, tok, loading, setLoading } = useContext(AuthContext);
  const { hotelName } = useParams();

  // Effect to handle resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setIsOpen(false); // Close sidebar on mobile by default
      } else {
        setIsMobile(false);
        setIsOpen(true); // Open sidebar on larger screens
      }
    };
    
    // Set initial state
    handleResize();
    
    // Add resize event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array to run once on mount

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar - Fixed position */}
      <div 
        className={`
          fixed top-0 left-0 h-full
          ${isOpen ? (isMobile ? 'w-64' : 'w-64') : (isMobile ? '-translate-x-full' : 'w-20')} 
          bg-black text-white transition-all duration-300 ease-in-out p-4 z-30
        `}
      >
        <div className="flex items-center mb-8">
          <div className={`flex items-center ${!isOpen && !isMobile && 'justify-center w-full'}`}>
            <div className="h-8 w-8  rounded-lg flex items-center justify-center">
                                <Link to={'/'} >          <FaBowlFood className="text-3xl text-orange-500" /></Link>   
            </div>
            {(isOpen || isMobile) &&   <Link to="/" className="flex items-center space-x-2">

                                <span className="text-xl font-semibold text-gray-300">
                                    CHATORA SQUAD
                                </span>
                            </Link>}
          </div>
          
          {/* Close button for mobile */}
          {isMobile && isOpen && (
            <button 
              onClick={toggleSidebar}
              className="ml-auto text-white hover:text-orange-300 transition-colors"
            >
              <X size={24} />
            </button>
          )}
        </div>
        
        {/* Toggle button for desktop */}
        {!isMobile && (
          <button 
            onClick={toggleSidebar}
            className="absolute -right-4 top-6 bg-orange-500 rounded-full p-2 hover:bg-orange-600 transition-colors"
          >
            <Menu size={24} />
          </button>
        )}
        
        <nav className="mt-8">
          <NavItem 
            icon={<Home size={20} />} 
            label="Profile" 
            isOpen={isOpen} 
            path={'/' + hotelName + '/profile?token=' + tok} 
            pathname={'/' + hotelName + '/profile'} 
          />
          <NavItem 
            icon={<Building2 size={20} />} 
            label="Room" 
            isOpen={isOpen} 
            path={'/' + hotelName + '/profile/room/?token=' + tok} 
            pathname={'/' + hotelName + '/profile/room'} 
          />
          <NavItem icon={< Hotel size={20} />}
          label={'Orders'}
          isOpen={isOpen}
          path={'/' + hotelName + '/profile/order/?token=' + tok} 
          pathname={'/' + hotelName + '/profile/order'} 
          />
        </nav>
      </div>
      
      {/* Main Content - With appropriate margin/padding based on sidebar state */}
      <div 
        className={`
          flex-1 min-h-screen
          ${!isMobile && (isOpen ? 'ml-64' : 'ml-20')}
          ${isMobile ? 'ml-0' : ''}
          transition-all duration-300
        `}
      >
        {/* Header - Fixed at the top of the content area */}
        <header className="sticky top-0 bg-white h-16 flex items-center justify-between px-6 border-b z-10">
          {/* Hamburger menu for mobile */}
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <Menu size={24} />
            </Button>
          )}
          
          <div className="flex items-center gap-4 ml-auto">
            <Button variant="ghost" size="icon">
              <Bell size={20} />
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Dashboard Content - Scrollable */}
        <main className="p-6 overflow-auto">
          <Routes>
            <Route path='/' element={<Profile />} />
            <Route path='/room' element={<Room user={user} />} />
            <Route path='/order' element={<HotelOrders />} />
            {/* <Route path='/kitchen' element={<Kittchen />} /> */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, isOpen, path, pathname }) => {
  const location = useLocation();

  // Normalize paths by trimming trailing slashes
  const currentPath = location.pathname.replace(/\/$/, "");
  const targetPath = pathname.replace(/\/$/, "");

  const isActive = currentPath === targetPath;

  return (
    <Link to={path}>
      <div
        className={`flex items-center p-3 mb-2 rounded-lg text-xl font-semibold cursor-pointer ${
          isActive ? "bg-[#de7932] text-white" : "text-gray-400 hover:bg-slate-800"
        } transition-all duration-200`}
      >
        {icon} {isOpen && <span className="ml-3">{label}</span>}
      </div>
    </Link>
  );
};

export default DashboardLayout;