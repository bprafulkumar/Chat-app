import React, { memo, useContext } from 'react'
import { Button } from 'rsuite'
import TimeAgo from 'timeago-react'
import { CurrentRoomContext } from '../../../Context/current-room.context'
import { useHover, useMediaQuery } from '../../../misc/custom-hooks'
import { auth } from '../../../misc/firebase'
import { trasformToArr } from '../../../misc/helper'
import Profileavatar from '../../Dashboard/Profileavatar'
import PresenceDot from '../../PresenceDot'
import IconBtnControl from './IconBtnControl'
import ImgBtnModal from './ImgBtnModal'
import ProfileInfoBtnModal from './ProfileInfoBtnModal'

const renderMessageFile = (file) => {
  if(file.contentType.includes('image')){
    return  <div className='height-220'>
      <ImgBtnModal src={file.url} fileName = {file.name} />
    </div>
}
  if(file.contentType.includes('audio')){
  return <audio controls>
    <source src={file.url} type="audio/mp3" />
    Your browser does not support the audio element
  </audio>

  }
return <a href={file.url}>Download {file.url}</a>
}
function MessageItem({message,handleAdmin,handleLike,handleDelete}) {
  const {author,createdAt ,file,text,likes,likeCount} = message

  const details = useContext(CurrentRoomContext)
    const admins =  trasformToArr(details.admins)
    const isAdmin = admins.includes(auth.currentUser.uid);

    const isMobile = useMediaQuery('(max-width:992px')
    
    const isMsgAuthorAdmin = admins.includes(author.uid);
    const isAuthor = auth.currentUser.uid === author.uid
    const canGrantAdmin = isAdmin && !isAuthor
    
    const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid) 
    // console.log(isLiked,"hello")

    // console.log((likes),"likes")
    // console.log(auth.currentUser.uid,"hdhdhdh")
    
    const [selfRef,isHover] = useHover()
    
    const canShowIcon = isMobile || isHover

    // console.log(canGrantAdmin,"canGrantAdmin")
  return (

    <li className= {`padded mb-1 cusor-pointer ${isHover ? 'bg-black-02' : ''}`} ref={selfRef}>
      <div className=' d-flex align-items-center font-bolder mb-1'>

        <PresenceDot uid={author.uid} />

        <Profileavatar src = {author.avatar} name={author.name} className='m1-1 ml-2' size = 'xs' />

        {/* <span className='ml-2'>{author.name}</span> */}
        <ProfileInfoBtnModal profile={author} appearance = 'link' className="p-0 ml-1 text-black" message = {message} >
          {canGrantAdmin &&
          <Button block onClick={() => handleAdmin(author.uid)} color='blue'>
            {
              isMsgAuthorAdmin ? 'Remove admin permission' : 'Give admin in this room'
            }
          </Button>
          }
        </ProfileInfoBtnModal>
        <TimeAgo datetime={createdAt} className='font-normal text-black-45 ml-2'/>

        

        <IconBtnControl {...(isLiked ? {color: 'red'} : {})} isVisible={canShowIcon} iconName = "heart" tooltip = 'Like this message' onClick={() => handleLike(message.id)} badgeContent ={likeCount} />
          {
            isAuthor && <IconBtnControl  isVisible={canShowIcon} iconName = "close" tooltip = 'Delete this message' onClick={() => handleDelete(message.id,file)} />
          }

        </div>

        <div>
          {text &&
          <span className='word-break-all'>{text}</span>
          }
          {file && renderMessageFile(file)}
        </div>
    </li>
   
  )
}

export default memo(MessageItem)
