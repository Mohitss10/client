import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { Menu, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { SignIn, useUser } from '@clerk/clerk-react';

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();

  return user ? (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="w-full px-6 py-3 bg-black/40 backdrop-blur-sm border-b border-white/10 flex items-center justify-between">
        <img
          className="cursor-pointer w-32 sm:w-44 rounded-2xl"
          src={assets.scrlogo}
          alt="Logo"
          onClick={() => navigate('/')}
        />
        {sidebar ? (
          <X onClick={() => setSidebar(false)} className="h-6 w-6 text-white sm:hidden" />
        ) : (
          <Menu onClick={() => setSidebar(true)} className="h-6 w-6 text-white sm:hidden" />
        )}
      </nav>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className="flex-1 overflow-y-auto bg-black/30 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default Layout;
