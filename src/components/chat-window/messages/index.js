import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Alert } from 'rsuite';
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

  let alertMsg ;

  const handleAdmin = useCallback(async() => {
        const adminsRef =  database.ref(`/rooms/${id}/admins`)

      await adminsRef.transaction(admins => {
        if(admins) {
          if(admins.uid) { 
            admins.uid = null
            alertMsg = 'Admin permission removed';
          }else{
            admins.uid = true
            alertMsg = 'Admin permission granted';
          }
        }
        return admins
      })

      Alert.info(alertMsg,4000)

    },[id])
  
  
  return (
    <ul className='msg-list custome-scroll'>
      {isChatEmpty && <li>No messages yet</li>}
      {canShowMessages && messages.map(msg => <MessageItem key={msg.id} message = {msg} handleAdmin={handleAdmin}/>)}
    </ul>
  )
}

export default Messages
