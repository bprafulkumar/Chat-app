import React, { useCallback, useEffect, useState } from 'react'
import { useRef } from 'react';
import { useParams } from 'react-router';
import { Alert, Button } from 'rsuite';
import { auth, database, storage } from '../../../misc/firebase'
import trasformToArrWithId, { groupBy } from '../../../misc/helper';
import MessageItem from './messagesItem';

const PAGE_SIZE = 15;
const messagesRef = database.ref('/messages');

function shouldScrollToBottom(node,threshold = 30){
  const percentage = (100 * node.scrollTop) / (node.scrollHeight - node.clientHeight) || 0;

  return percentage > threshold
}

function Messages() {

  const {id} = useParams();
  const [messages, setMessages] = useState(null)
  const [limit, setLimit] = useState(PAGE_SIZE)
  const selfRef = useRef()


  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;

  const loadMessages = useCallback((limitToLast) => {
    
    const node = selfRef.current;
    messagesRef.off()
    messagesRef.orderByChild('roomId').limitToLast(limitToLast || PAGE_SIZE).equalTo(id).on('value',(snap)=>{
      // console.log(snap.val(),"snapvalue")
      const data =trasformToArrWithId(snap.val());


      if(shouldScrollToBottom(node)) {
        node.scrollTop = node.scrollHeight;
      }

      setMessages(data)
    })

    setLimit(p => p + PAGE_SIZE)
  },[id])

  const onLoadMore = useCallback(() => {
    const node = selfRef.current;
    const oldHeight = node.scrollHeight;
    loadMessages(limit)
    
    setTimeout(() => {
      const newHeight = node.scrollHeight
      node.scrollTop = newHeight - oldHeight;
    },200)
  },[loadMessages,limit])

  useEffect(() => {

    // const node = selfRef.current;

    loadMessages();

    // setInterval(() => {
    //   node.scrollTop = node.scrollHeight;
      
    // },200)
    return () => {
      messagesRef.off('value')
    }
  }, [loadMessages]);

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
  
  const handleLike = useCallback(async(msgId) => {
    const {uid} = auth.currentUser;
    const messageRef =  database.ref(`/messages/${msgId}`)

    let alertMsg ;

    await messageRef.transaction(msg => {
      if(msg) {
        if(msg.likes && msg.likes[uid]) { 
          msg.likeCount -= 1;
          msg.likes[uid] = null
          alertMsg = 'Like removed';
        }else{
          msg.likeCount += 1;
          if(!msg.likes){
            msg.likes = {} ;
          }

          msg.likes[uid] = true;
          alertMsg = 'Like added';
        }
      }
      return msg
    })

    Alert.info(alertMsg,4000)
    })

    const handleDelete = useCallback(async(msgId,file) => {

      if(!window.confirm('Delete this message?')) {
        return ;
      }
      const isLast = messages[messages.length - 1].id === msgId;

      const updates = {};

      updates[`/messages/${msgId}`] = null;
      if(isLast && messages.length > 1){
        updates[`/rooms/${id}/lastMessage`] = {
          ...messages[messages.length - 2],
          msgId : messages[messages.length - 2].id
        }
      }

      if(isLast && messages.length === 1){
        updates[`/rooms/${id}/lastMessage`] = null
      };
      try {
        await database.ref().update(updates)

        Alert.info('Message has been deleted')
      } catch (err) {
       return  Alert.error(err.message,4000)
      }

      if(file){
        try {
          const fileRef = storage.refFromURL(file.url)
          await fileRef.delete()
        } catch (error) {
          Alert.error(error.message)
        }
      }
    },[id,messages])

    const renderMessages = () => {

      const group = groupBy(messages , (item) => new Date(item.createdAt).toDateString())

      const items =[]

      Object.keys(group).forEach((date) =>{
        items.push(<li key={date} className='text-center mb-1 padded' >{date}</li>)

        const msgs = group[date].map(msg => {
          return <MessageItem key={msg.id} message = {msg} handleAdmin={handleAdmin} handleLike ={handleLike} handleDelete={handleDelete}/>
        })
        items.push(...msgs)
      })

      return items
    }

  return (
    <ul ref={selfRef} className='msg-list custome-scroll'>
      {messages && messages.length >= PAGE_SIZE && (<li className='text-center mt-2 mb-2'>
        <Button onClick={onLoadMore} color='green'>Load more</Button>
      </li>)}
      {isChatEmpty && <li>No messages yet</li>}
      {canShowMessages && renderMessages()}
    </ul>
  )
}

export default Messages
