import React from 'react'

const SideBarToggle = ({handleSidebarToggle, sidebarOpen}) => {
  return (
    <>
          <svg
  onClick={handleSidebarToggle}
  className="fixed top-0 h-9 w-9 z-20 sm:hidden block border border-[#424549] rounded-md ml-1 mt-4"
  fill="none"
  viewBox="0 0 24 24"
  stroke="#8398e6"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    
    d={` ${!sidebarOpen ? 'M4 6h16M4 12h16m-7 6h7' : 'M6 18L18 6M6 6l12 12'}`}
  />
</svg>
    </>
  )
}

export default SideBarToggle