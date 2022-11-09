import React, { memo, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ButtonToolbar, Icon } from 'rsuite'
import { CurrentRoomContext, CurrentRoomProvider, useCurrentRoom } from '../../../Context/current-room.context'
import { useMediaQuery } from '../../../misc/custom-hooks'
import EditRoomBtnDrawer from './EditRoomBtnDrawer'
import RoomInfoBtnModal from './RoomInfoBtnModal'
// import Sidebar from '../../sidebar'

function Top() {
    // const name = useCurrentRoom()
    const details = useContext(CurrentRoomContext)
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
          <EditRoomBtnDrawer/>
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
