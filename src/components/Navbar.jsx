
import React from 'react'

function Navbar() {
  return (
    <nav className='flex fixed top-0 z-30 w-full justify-between bg-slate-700 text-white p-4'>
    <div className='logo'>
        <span className='font-bold text-xl mx-8'>iTask</span>
    </div>
    <ul className='flex gap-8 mx-9'> 
    <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
    <li className='cursor-pointer hover:font-bold transition-all'>Your Task</li>
    </ul>
    </nav>
  )
}

export default Navbar
