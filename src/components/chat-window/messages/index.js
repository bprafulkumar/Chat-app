import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { database } from '../../../misc/firebase'
import trasformToArrWithId from '../../../misc/helper';
import MessageItem from './messagesItem';

function Messages() {

  const {id} = useParams();
  const [messages, setMessages] = useState(null)

  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;

  useEffect(() => {
    const messagesRef = database.ref('/messages');

    messagesRef.orderByChild('roomId').equalTo(id).on('value',(snap)=>{
      // console.log(snap.val(),"snapvalue")
      const data =trasformToArrWithId(snap.val());

      setMessages(data)
    })
  
    return () => {
      messagesRef.off('value')
    }
  }, [id]);
  
  return (
    <ul className='msg-list custome-scroll'>
      {isChatEmpty && <li>No messages yet</li>}
      {canShowMessages && messages.map(msg => <MessageItem key={msg.id} message = {msg}/>)}
    </ul>
  )
}

export default Messages
