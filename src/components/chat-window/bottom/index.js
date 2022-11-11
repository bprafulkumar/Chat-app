import React, { useState } from 'react'
import { useCallback } from 'react';
import { Alert, Icon, Input, InputGroup } from 'rsuite'
import firebase from 'firebase/app';
import { useProfile } from '../../../Context/Profile.context';
import { useParams } from 'react-router';
import { database } from '../../../misc/firebase';
import AttachmentBtnModal from './AttachmentBtnModal';
import AudioMsgBtn from './AudioMsgBtn';

function assembleMessage(profile,id){
  return {
    roomId : id,
    author  : {
      name: profile.name,
      uid : profile.uid,
      createdAt : profile.createdAt,
      ...(profile.avatar ? {avatar :profile.avatar} : {})
    },
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    likeCount : 0
  }
}

function Bottom() {

  const [input , setInput] = useState('');

  const [isLoading , setIsLoading] = useState(false)

  const {profile} = useProfile();
  const {id} = useParams()

  const onInputChange = useCallback((value)=>{
          setInput(value)
  },[])

  const onSendClick = async() => {
    if(input.trim() === ''){
      return;
    }
    const msgData = assembleMessage(profile,id)

    msgData.text = input;

    const updates = {};

    const messageId = database.ref('messageId').push().key;
    updates[`/messages/${messageId}`] = msgData;

    updates[`/rooms/${id}/lastMessage`] = {
      ...msgData,msgId : messageId,
    };
    
    setIsLoading(true)


    try {
      await database.ref().update(updates);
      setInput('')
      setIsLoading(false)
    } catch (error) {
      Alert.error(error.message , 4000)
    }
  }

  const onKeyDown = (ev) => {
     if(ev.keyCode === 13){
      ev.preventDefault();
      onSendClick()
     }
  }

  const afterUpload = useCallback(async(files) => {
      setIsLoading(true);

      const updates = {};

      files.forEach(file => {
        const msgData = assembleMessage(profile,id);
        msgData.file = file;

        const messageId = database.ref('message').push().key;

        updates[`/messages/${messageId}`] = msgData;
      })
      const lastMsgId = Object.keys(updates).pop();

      updates[`/rooms/${id}/lastMessage`] = {
        ...updates[lastMsgId],
        msgId:lastMsgId
      }
      try {
        await database.ref().update(updates);
        setIsLoading(false)
      } catch (error) {
        Alert.error(error.message , 4000)
      }
  },[id,profile])


  return (
    <div>
     <InputGroup>
     <AttachmentBtnModal afterUpload={afterUpload}/>
     <AudioMsgBtn afterUpload={afterUpload} />
     <Input placeholder = "Write a new message here..." value={input} onChange={onInputChange} onKeyDown = {onKeyDown}/>

     <InputGroup.Button color='blue' appearance='primary' onClick={onSendClick} disabled={isLoading}>
     <Icon icon={"send"}/>
    </InputGroup.Button>
     </InputGroup>
    </div>
  )
}

export default Bottom
