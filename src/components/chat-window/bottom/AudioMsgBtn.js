import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router'
import { Alert, Icon, InputGroup } from 'rsuite'
import { storage } from '../../../misc/firebase'
import { ReactMic } from 'react-mic';
import { useCallback } from 'react'

function AudioMsgBtn({afterUpload}) {
    const {id} = useParams()

    const [ isRecording, setIsRecording] = useState(false);
    const  [isUploading , setIsUploading] = useState(false)

    const onClick = useCallback(() => {
        setIsRecording(p => !p);
      },[])

      const onUpload = useCallback(
        async (data) => {
            setIsUploading(true)
          try {
            const snap = await storage.ref(`/chat/${id}`).child(`audio_${Date.now()}.mp3`).put(data.blob ,{
                cacheControl : `public, max-age=${3600*24*3}`
            });
            const file = {
                contentType : snap.metadata.contentType,
                name : snap.metadata.name,
                url : await snap.ref.getDownloadURL()
            };
            setIsUploading(false)
            afterUpload([file])
          } catch (error) {
            setIsUploading(false)
            Alert.error(error.message)
          }
        },[afterUpload,id])
      
    
{
  return (
    <div>
        <InputGroup.Button onClick={onClick} disabled={isUploading} className= {isRecording ? 'animate-blink' : ''} >
      <Icon icon={"microphone"}/>
      <ReactMic
          record={isRecording}
          className="d-none"
          onStop={onUpload}
          mimeType = "audio/mp3"
           />
      </InputGroup.Button>
    </div>
  )
}
}

export default AudioMsgBtn
