import React, { memo, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ButtonToolbar, Icon } from 'rsuite'
import { CurrentRoomContext, CurrentRoomProvider, useCurrentRoom } from '../../../Context/current-room.context'
import { useMediaQuery } from '../../../misc/custom-hooks'
import { auth } from '../../../misc/firebase'
import { trasformToArr } from '../../../misc/helper'
import EditRoomBtnDrawer from './EditRoomBtnDrawer'
import RoomInfoBtnModal from './RoomInfoBtnModal'
// import Sidebar from '../../sidebar'

function Top() {
    // const name = useCurrentRoom()
    // const admins = trasformToArr(currentRoom.admins)
    // const isAdmin = admins.includes(auth.currentUser.uid)

    // console.log('admin', admins, isAdmin)
    const details = useContext(CurrentRoomContext)
// console.log(details,"details")
    const admins =  trasformToArr(details.admins)
    const isAdmin = admins.includes(auth.currentUser.uid);
  

    // console.log("detaiks",details)
    const isMobile = useMediaQuery('(max-width :992px)')
  return (
    <div>
       <div style={{display:'flex', justifyContent:'space-between', alignItems: "center"}}>
        <div>
        <h4 className='text-disappear d-flex align-items-center'>
          {
            isMobile &&
            <Icon componentClass={Link} to ="/" icon={"arrow-circle-left"} size="2x" className={isMobile ? 'd-inline-block p-0 mr-2 text-blue link-unstyled' : 'd-none'} />
          }
          <span className='text-disappear'>{details.name}</span>
        </h4>
        </div>
        <div>

        <ButtonToolbar className='ws-nowrap'>
          {
            isAdmin && 
          <EditRoomBtnDrawer/>
          }
        </ButtonToolbar>
        </div>
       </div>
       <div style={{display:'flex', justifyContent:'space-between', alignItems: "center"}}>
        <span>todo</span>
        <RoomInfoBtnModal/>
       </div>

    </div>
  )
}

export default memo(Top)
