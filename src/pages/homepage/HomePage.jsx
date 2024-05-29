import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/sidebar/navbar/Navbar'

function HomePage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-4">
          {/* Main content goes here */}
        </div>
      </div>
    </div>
  )
}

export default HomePage