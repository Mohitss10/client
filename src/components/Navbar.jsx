import React from 'react'
import { assets } from '../assets/assets'
import { Navigate, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'


const Navbar = () => {

  const navigate = useNavigate()

  const { user } = useUser()
  const { openSignIn } = useClerk()

  return (

    <div className='fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32 cursor-pointer'>
<div
  className="flex items-center gap-2 cursor-pointer"
  onClick={() => navigate('./Hero')} // Redirect to Hero route
>
  <img
    src={assets.logo}
    alt="logo"
    className="w-10"
  />
  <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
    AIMatrix
  </span>
</div>




      {
        user ? <UserButton /> :
          (
            <button onClick={openSignIn} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>
              Get Started
              <ArrowRight className='h-4 w-4' />
            </button>
          )
      }

    </div>
  )
}

export default Navbar
