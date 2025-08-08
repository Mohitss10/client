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
      <nav className="w-full px-6 py-3 bg-black/40 backdrop-blur-lg flex items-center justify-between">
<div
  className="flex items-center gap-2 cursor-pointer"
  onClick={() => navigate('/')} // Redirect to Hero route
>
  <img
    src={assets.logo}
    alt="logo"
    className="w-8"
  />
  <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
    AIMatrix
  </span>
</div>

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
