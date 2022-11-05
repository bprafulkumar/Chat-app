import React from 'react'
import CreateRoomBtnModal from './Dashboard/createRoomBtnModal'
import DashboardToggle from './Dashboard/DashboardToggle'

function Sidebar() {
  return (
    <div className='h-100 pt-2'>
      <div>
        <DashboardToggle/>
        <CreateRoomBtnModal/>
      </div>
      bottom
    </div>
  )
}

export default Sidebar
