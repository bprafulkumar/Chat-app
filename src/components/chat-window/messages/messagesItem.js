import React, { memo } from 'react'
import TimeAgo from 'timeago-react'
import Profileavatar from '../../Dashboard/Profileavatar'
import PresenceDot from '../../PresenceDot'
import ProfileInfoBtnModal from './ProfileInfoBtnModal'

function MessageItem({message}) {
  const {author,createdAt , text} = message
  // console.log("author",author)
  return (

    <li className='padded mb-1'>
      <div className=' d-flex align-items-center font-bolder mb-1'>

        <PresenceDot uid={author.uid} />

        <Profileavatar src = {author.avatar} name={author.name} className='m1-1 ml-2' size = 'xs' />

        {/* <span className='ml-2'>{author.name}</span> */}
        <ProfileInfoBtnModal profile={author} appearance = 'link' className="p-0 ml-1 text-black" message = {message} />
        <TimeAgo datetime={createdAt} className='font-normal text-black-45 ml-2'/>
        </div>

        <div>
          <span className='word-break-all'>{text}</span>
        </div>
    </li>
   
  )
}

export default memo(MessageItem)
