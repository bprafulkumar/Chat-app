import React from 'react'
import { Drawer,Button, Divider } from 'rsuite'
import {useProfile} from '../../Context/Profile.context'
import Editableinput from '../Editableinput';

function Dashboard({onSignOut}) {
    const  {profile} = useProfile();
   //  console.log(profile)
    // console.log(profile,"indexbar"
    const onSave = async (data) => {
      console.log(data)
    }
  return (
    <>
     <Drawer.Header>
        <Drawer.Title>
            Dashboard
        </Drawer.Title>
     </Drawer.Header>

     <Drawer.Body>
        <h3>Hey , {profile.name} </h3>
        <Divider/>
        <Editableinput
        name = "nickname"
        initialValue = {profile.name}
        onSave = {onSave}
        label = {<h6 className='md-2'>Nickname</h6>}
        />
     </Drawer.Body>

     <Drawer.Footer>
        <Button block color='red' onClick={onSignOut} >
                SignOut
        </Button>
     </Drawer.Footer>
    </>
  )
}

export default Dashboard
