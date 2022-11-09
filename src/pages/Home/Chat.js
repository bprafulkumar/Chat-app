import React from 'react'
import { useParams } from 'react-router'
import { Loader } from 'rsuite'
import Bottom from '../../components/chat-window/bottom'
import Messages from '../../components/chat-window/messages'
import Top from '../../components/chat-window/top'
import { CurrentRoomProvider } from '../../Context/current-room.context'
import { useRooms } from '../../Context/rooms.context'
import { auth } from '../../misc/firebase'
import { trasformToArr } from '../../misc/helper'

function Chat() {

    const { id } = useParams();

    const rooms = useRooms();

   

    if(!rooms){
        return <Loader center vertical size='md' content="Loading" speed='slow' />
    }

    const currentRoom = rooms.find(room => room.id === id);

    if(!currentRoom) {
        return <h6 className='text-center mt-page'>Chat {id} not found</h6>
    }

  

    const {name , description,} = currentRoom;


    const admins = trasformToArr(currentRoom.admins)
    const isAdmin = admins.includes(auth.currentUser.uid)
    // console.log(isAdmin,"dhdhdhd")
    // console.log(admins , "hdhfhfhfh")


    // console.log(name,"prafyshshsh", description , "deccs")

    const CurrentRoomData = {
            name,description,admins,isAdmin
    }
  return (
    <CurrentRoomProvider data ={currentRoom}>
      <div className='chat-top'>
        <Top/>
      </div>

      <div className='chat-middle'>
       <Messages/>
      </div>

      <div className='chat-bottom'>
        <Bottom/>
      </div>
    </CurrentRoomProvider>
  )
}

export default Chat
