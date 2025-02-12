import React, { useContext } from 'react';
import { Bell, Home, Calendar, Building2, Menu, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useLocation, useParams } from 'react-router-dom';
import { AuthContext } from '@/Context/AuthContext';
import { Routes, Route } from 'react-router-dom';
import Profile from '@/pages/Profile';
import Room from '@/pages/Room';
import Kittchen from '@/pages/Kitchen';

const DashboardLayout = ({}) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const {user,tok,loading,setLoading}=useContext(AuthContext)
  const {hotelName}=useParams()
 
  
  return (
    <div className="flex min-h-screen bg-">
      {/* Sidebar */}
      <div className={`${isOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white transition-all duration-300 ease-in-out p-4 fixed h-full`}>
        <div className="flex items-center mb-8">
          <div className={`flex items-center ${!isOpen && 'justify-center w-full'}`}>
            <div className="h-8 w-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm" />
            </div>
            {isOpen && <span className="ml-2 text-xl font-bold">ChatoraSquad</span>}
          </div>
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-4 top-6 bg-orange-500 rounded-full p-2 hover:bg-orange-600 transition-colors"
        >
          <Menu size={16} />
        </button>

        <nav>
          <NavItem icon={<Home size={20} />} label="Profile" isOpen={isOpen}  path={'/'+hotelName+'/profile?token='+tok} pathname={'/'+hotelName+'/profile/'} />
          {/* <NavItem icon={<Calendar size={20} />} label="Kitchen" isOpen={isOpen} path={'/'+hotelName+'/profile/kitchen/?token='+tok} pathname={'/'+hotelName+'/profile/kitchen'}  /> */}
          <NavItem icon={<Building2 size={20} />} label="Room" isOpen={isOpen} path={'/'+hotelName+'/profile/room/?token='+tok} pathname={'/'+hotelName+'/profile/room'}  />
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${isOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Header */}
        <header className="bg-white h-16 flex items-center justify-between px-6 border-b">
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-500">
              Do you know the latest update of 2022?
              <span className="text-gray-400 ml-2">
                A overview of our is now available on You...
              </span>
              <ExternalLink className="inline ml-2" size={14} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell size={20} />
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 ">
         <Routes>
          <Route path='/' element={<Profile />} ></Route>
          <Route path='/room' element={<Room />} ></Route>
          {/* <Route path='/kitchen' element={<Kittchen />} ></Route> */}
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
        className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer ${
          isActive ? "bg-orange-500 text-white" : "text-gray-400 hover:bg-slate-800"
        } transition-all duration-200`}
      >
        {icon} {isOpen && <span className="ml-3">{label}</span>}
      </div>
    </Link>
  );
};



export default DashboardLayout;