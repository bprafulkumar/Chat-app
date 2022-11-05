import React from 'react'
import { Avatar } from 'rsuite'
import { getNameInitials } from '../../misc/helper'

function Profileavatar({name , ...avatarprops}) {
  return (
    
      <Avatar {...avatarprops} circle>
        {
           getNameInitials(name)
        }
      </Avatar>
 
  )
}

export default Profileavatar
