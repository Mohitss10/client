import { assets } from '../assets/assets';
import { Protect, useClerk, useUser } from '@clerk/clerk-react';
import { House, SquarePen, Eraser, FileText, Hash, Image, Scissors, Users, LogOut } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House },
  { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
  { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
  { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
  { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
  { to: '/ai/community', label: 'Community', Icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <div
      className={`
        // fixed top-14 left-0 z-50  h-[calc(100vh-71px)] w-60  border border-white/10 p-4 sm:p-6 bg-black/80 backdrop-blur-sm
        transform ${sidebar ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out
        sm:translate-x-0 sm:static sm:block
      `}
    >
      <div className="h-full flex flex-col justify-between">
<div className="py-6">
  <img src={user.imageUrl} alt="User" className="w-14 rounded-full mx-auto" />
  <h1 className="mt-2 text-center text-white text-sm">{user.fullName}</h1>

  <div className="mt-8 pt-6 border-t border-white/10 space-y-2 text-sm text-white">
    {navItems.map(({ to, label, Icon }) => (
      <NavLink
        key={to}
        to={to}
        end={to === '/ai'}
        onClick={() => setSidebar(false)}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 rounded-full hover:bg-white/10 transition ${
            isActive ? 'bg-white/10 font-medium' : 'text-white/70'
          }`
        }
      >
        <Icon className="w-4 h-4" />
        {label}
      </NavLink>
    ))}
  </div>
</div>


        <div className=" px-4 py-4 flex items-center justify-between">
          <div onClick={openUserProfile} className="flex items-center gap-2 cursor-pointer">
            <img src={user.imageUrl} className="w-6 h-6 rounded-full" alt="user" />
            <div>
              <h1 className="text-sm text-white">{user.fullName}</h1>
              <p className="text-xs text-white/70">
                <Protect plan="premium" fallback="Free">Premium </Protect>
                Plan
              </p>
            </div>
          </div>
          <LogOut
            onClick={() => signOut()}
            className="w-5 h-5 text-white/60 hover:text-white cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
