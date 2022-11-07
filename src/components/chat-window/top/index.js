import React, { memo, useContext } from 'react'
import { CurrentRoomContext, CurrentRoomProvider, useCurrentRoom } from '../../../Context/current-room.context'

function Top() {
    // const name = useCurrentRoom()
    const details = useContext(CurrentRoomContext)
    // console.log("detaiks",details)
    // console.log(Object.values(details), "objetcs")
  return (
    <div>
       {details.name}
    </div>
  )
}

export default memo(Top)
