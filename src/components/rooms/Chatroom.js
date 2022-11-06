import React from 'react'
import { Loader, Nav } from 'rsuite'
import Roomitem from './Roomitem'
import { useRooms } from '../../Context/rooms.context'
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Chatroom({aboveElHeight}) {

  const rooms = useRooms();
  const location = useLocation();
  let navigate = useNavigate();

//   function changeLocation(placeToGo){
//     navigate(placeToGo, { replace: true });
//     window.location.reload();
// }

// const AftersomeSecondsRendering = () => {
//      setTimeout(() => {
//       changeLocation('/')
//      }, 2000);
// }


  return (
    <Nav appearance='subtle' vertical reversed className='overflow-y-scroll custom-scroll'
    style={{height:`calc(100%-${aboveElHeight}px)`}} activeKey = {location.pathname}>

      {
        !rooms && <Loader center vertical content="Loading" speed='slow' size = "md" />
      }
      {
        rooms && rooms.length > 0 && rooms.map(room =>(
        <Nav.Item componentClass={Link} to = {`/chat/${room.id}`} key={room.id}  eventKey={`/chat/${room.id}`}  
        >
            <Roomitem room= {room} />
        </Nav.Item>

        ))
      }
    </Nav>
  )
}

export default Chatroom
